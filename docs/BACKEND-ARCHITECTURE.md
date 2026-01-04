# MrClinc Backend Architecture

## Overview

MrClinc backend provides API endpoints for:
1. Patient request submission and tracking
2. Pathway Developer (PD) authentication and case management
3. Pool-based case assignment

**Critical Constraints Applied:**
- NO pricing/earnings in API responses (kept in content layer)
- NO medical decision fields
- NO clinic ranking/scoring
- NO "quotes", "offers", "packages", "deals" terminology
- Patient-safe responses never expose PD info or internal data

---

## API Routes

### Public Endpoints (No Auth)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/requests` | Submit new patient request |
| GET | `/api/requests/[code]` | Track request by TRK code |

### PD Portal Endpoints (Session Auth)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/pd/auth` | Login (creates session) |
| GET | `/api/pd/auth` | Check auth status |
| DELETE | `/api/pd/auth` | Logout |
| GET | `/api/pd/cases` | List assigned + pool cases |
| GET | `/api/pd/cases/[code]` | Get case details |
| PATCH | `/api/pd/cases/[code]` | Update case status |
| POST | `/api/pd/cases/claim` | Claim case from pool |

### Admin Endpoints (Placeholder)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/cases` | Admin case list (not implemented) |

---

## Data Flow

### 1. Patient Request Submission

```
Patient submits form
        │
        ▼
POST /api/requests
        │
        ├── Validate input (Zod)
        │
        ├── Generate TRK-XXXXX code
        │
        ├── Create/find patient record
        │
        ├── Create request record
        │   - status: "received"
        │   - isFso: true if cancer/general
        │
        ├── Create timeline entry
        │
        ├── Handle PD assignment:
        │   ├── If PD code valid → Direct assignment
        │   └── If no/invalid code → Pool (unassigned)
        │
        └── Return tracking code + confirmation
```

### 2. Pool Assignment (LOCKED Rules)

```
Request without PD code
        │
        ▼
Goes to POOL (unassigned)
        │
        ▼
PD views pool (GET /api/pd/cases)
        │
        ├── Cases sorted by city proximity
        │   (same city first)
        │
        └── PD claims case (POST /api/pd/cases/claim)
                │
                ▼
        First PD to claim gets it
        (first-come-first-served)
```

### 3. Patient Tracking

```
Patient enters TRK code
        │
        ▼
GET /api/requests/[code]
        │
        ├── Lookup request
        │
        ├── Build PATIENT-SAFE response:
        │   ✓ Tracking code
        │   ✓ Category (display name)
        │   ✓ Service type
        │   ✓ Status (friendly label)
        │   ✓ Timeline (status changes)
        │   
        │   ✗ NO PD code/info
        │   ✗ NO internal IDs
        │   ✗ NO channel info
        │   ✗ NO internal notes
        │
        └── Return PatientRequestView
```

---

## Database Schema

See `/lib/db/schema.ts` for full type definitions.

### Tables

| Table | Purpose |
|-------|---------|
| `patients` | Patient contact info |
| `requests` | Request tracking (no medical/pricing) |
| `request_timeline` | Status change history |
| `pathway_developers` | PD registry |
| `pd_sessions` | Server-side sessions |
| `pd_case_assignments` | PD-to-request links |
| `escalations` | Coordination issues |
| `clinical_channels` | Channel reference (no ranking) |

### Status Values

**Operational statuses (DB):**
- `received` - Initial state
- `under_review` - Being processed
- `channel_contacted` - Provider notified
- `awaiting_response` - Waiting for provider
- `information_ready` - Provider prepared info
- `next_steps_shared` - Next steps sent
- `confirmed` - Patient confirmed
- `in_coordination` - Active coordination
- `completed` - Successfully completed
- `closed` - Closed

**UI maps these to patient-friendly labels.**

---

## Authentication

### PD Session Management

- **No localStorage** - all server-side
- HTTP-only cookies for session tokens
- 24-hour session duration
- Manual PD onboarding (no public registration)

```
Login Flow:
1. POST /api/pd/auth with email + accessCode
2. Server validates credentials
3. Creates session in store
4. Sets HTTP-only cookie
5. Returns PD info (safe fields only)

Auth Check:
1. Read session cookie
2. Lookup in session store
3. Check expiration
4. Return PD if valid
```

---

## Validation

All inputs validated with Zod schemas (`/lib/validators/index.ts`).

### Key Schemas

- `createRequestSchema` - Patient request form
- `pdLoginSchema` - PD authentication
- `pdCaseUpdateSchema` - Case status updates
- `pdClaimCaseSchema` - Pool case claiming

### Tracking Code Format

- Pattern: `TRK-XXXXX`
- 5 alphanumeric characters (no confusing chars: I,O,0,1)
- Unique per request

### PD Code Format

- Pattern: `PD-XXXXX`
- Assigned during manual PD onboarding

---

## Response Standards

All API responses follow consistent format:

```typescript
// Success
{
  success: true,
  data: { ... }
}

// Error
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human-readable message",
    details?: { field: ["error"] }
  }
}
```

### HTTP Status Codes

| Code | Usage |
|------|-------|
| 200 | Success |
| 201 | Created |
| 400 | Validation error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Conflict (e.g., already claimed) |
| 500 | Server error |
| 501 | Not implemented |

---

## Terminology Compliance

### Patient-Facing Language

✅ **Use:**
- "information"
- "next steps"
- "provider contact"
- "healthcare provider"
- "clinical channel"
- "between you and the healthcare provider"

❌ **Never use:**
- "quotes"
- "offers"
- "packages"
- "deals"
- "chosen provider"
- "recommended clinic"

### Status Labels

Patient sees friendly labels like:
- "Received" → "Your request has been received"
- "Information Ready" → "Information is ready. Please check your email"
- "Next Steps Shared" → "Next steps have been shared with you"

---

## File Structure

```
app/api/
├── requests/
│   ├── route.ts              # POST: create request
│   └── [code]/
│       └── route.ts          # GET: track request
├── pd/
│   ├── auth/
│   │   └── route.ts          # POST/GET/DELETE: auth
│   └── cases/
│       ├── route.ts          # GET: list cases
│       ├── [code]/
│       │   └── route.ts      # GET/PATCH: single case
│       └── claim/
│           └── route.ts      # POST: claim from pool
└── admin/
    └── cases/
        └── route.ts          # Placeholder

lib/
├── db/
│   └── schema.ts             # Type definitions
├── validators/
│   └── index.ts              # Zod schemas
├── api/
│   └── responses.ts          # Response helpers
└── auth/
    └── session.ts            # Session management
```

---

## Production Notes

### Replace In-Memory Stores

Current implementation uses `Map` objects for demo:
- `patientStore`
- `requestStore`
- `timelineStore`
- `assignmentStore`
- `sessionStore`
- `pdStore`

For production, replace with:
- PostgreSQL/MySQL database
- Prisma or Drizzle ORM
- Redis for sessions (optional)

### Security Checklist

- [ ] Replace demo credentials
- [ ] Implement proper password hashing (bcrypt/argon2)
- [ ] Add rate limiting
- [ ] Add CORS configuration
- [ ] Add request logging
- [ ] Implement email notifications
- [ ] Add database transactions
- [ ] Set up monitoring/alerts

---

## Version

- **Schema Version:** 1.0
- **Last Updated:** January 2026
- **Aligned with:** MRCLINC-PROJECT-DEFINITION-v1_1.md
