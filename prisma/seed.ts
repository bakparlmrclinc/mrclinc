// prisma/seed.ts
// Seeds initial data for MrClinc Admin Panel

import { PrismaClient, AdminRole, PDStatus, VerificationState, CaseStatus, AssignmentMode, ContactDirection, ContactMethod } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL,
});

async function main() {
  console.log('🌱 Starting seed...');

  // ============================================
  // 1. SUPER_ADMIN USER
  // ============================================
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;
  if (!adminPassword) {
    throw new Error('ADMIN_SEED_PASSWORD environment variable is required');
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const superAdmin = await prisma.adminUser.upsert({
    where: { email: 'admin@mrclinc.com' },
    update: {},
    create: {
      email: 'admin@mrclinc.com',
      passwordHash,
      name: 'Super Admin',
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
    },
  });
  console.log('✅ Super Admin created:', superAdmin.email);

  // ============================================
  // 2. POOLS (City-based)
  // ============================================
  const pools = await Promise.all([
    prisma.pool.upsert({
      where: { city: 'Istanbul' },
      update: {},
      create: { city: 'Istanbul', queuePolicy: 'FIRST_CLAIM', isActive: true },
    }),
    prisma.pool.upsert({
      where: { city: 'Ankara' },
      update: {},
      create: { city: 'Ankara', queuePolicy: 'FIRST_CLAIM', isActive: true },
    }),
    prisma.pool.upsert({
      where: { city: 'Izmir' },
      update: {},
      create: { city: 'Izmir', queuePolicy: 'FIRST_CLAIM', isActive: true },
    }),
  ]);
  console.log('✅ Pools created:', pools.map(p => p.city).join(', '));

  // ============================================
  // 3. TEST PDs (Fake data only)
  // ============================================
  const pds = await Promise.all([
    prisma.pD.upsert({
      where: { pdCode: 'PD-10001' },
      update: {},
      create: {
        pdCode: 'PD-10001',
        fullName: 'Ayşe Yılmaz',
        profession: 'Healthcare Coordinator',
        country: 'TR',
        city: 'Istanbul',
        languages: ['tr', 'en'],
        email: 'ayse.test@example.com',
        phone: '+90 555 000 0001',
        status: PDStatus.ACTIVE,
        verificationState: VerificationState.VERIFIED,
      },
    }),
    prisma.pD.upsert({
      where: { pdCode: 'PD-10002' },
      update: {},
      create: {
        pdCode: 'PD-10002',
        fullName: 'Mehmet Demir',
        profession: 'Medical Liaison',
        country: 'TR',
        city: 'Ankara',
        languages: ['tr', 'en', 'de'],
        email: 'mehmet.test@example.com',
        phone: '+90 555 000 0002',
        status: PDStatus.ACTIVE,
        verificationState: VerificationState.VERIFIED,
      },
    }),
    prisma.pD.upsert({
      where: { pdCode: 'PD-10003' },
      update: {},
      create: {
        pdCode: 'PD-10003',
        fullName: 'Zeynep Kaya',
        profession: 'Patient Coordinator',
        country: 'TR',
        city: 'Istanbul',
        languages: ['tr', 'en', 'ar'],
        email: 'zeynep.test@example.com',
        phone: '+90 555 000 0003',
        status: PDStatus.PAUSED,
        verificationState: VerificationState.PENDING,
        notes: 'Awaiting document verification',
      },
    }),
  ]);
  console.log('✅ PDs created:', pds.map(p => p.pdCode).join(', '));

  // Add PDs to their city pools
  const istanbulPool = pools.find(p => p.city === 'Istanbul');
  const ankaraPool = pools.find(p => p.city === 'Ankara');

  if (istanbulPool) {
    await prisma.poolPD.upsert({
      where: { poolId_pdId: { poolId: istanbulPool.id, pdId: pds[0].id } },
      update: {},
      create: { poolId: istanbulPool.id, pdId: pds[0].id, isActive: true },
    });
    await prisma.poolPD.upsert({
      where: { poolId_pdId: { poolId: istanbulPool.id, pdId: pds[2].id } },
      update: {},
      create: { poolId: istanbulPool.id, pdId: pds[2].id, isActive: false }, // Zeynep is paused
    });
  }
  if (ankaraPool) {
    await prisma.poolPD.upsert({
      where: { poolId_pdId: { poolId: ankaraPool.id, pdId: pds[1].id } },
      update: {},
      create: { poolId: ankaraPool.id, pdId: pds[1].id, isActive: true },
    });
  }
  console.log('✅ Pool memberships created');

  // ============================================
  // 4. CLINICAL CHANNELS & PROVIDERS (Fake)
  // ============================================
  const channel1 = await prisma.clinicalChannel.upsert({
    where: { id: 'ch-test-001' },
    update: {},
    create: {
      id: 'ch-test-001',
      name: 'Test Medical Center Istanbul',
      city: 'Istanbul',
      serviceCoverage: ['Aesthetic Surgery', 'General Surgery'],
      status: 'ACTIVE',
      contactMethods: JSON.stringify({ email: 'contact@testclinic.example.com', phone: '+90 212 000 0000' }),
      responseSlaHours: 48,
    },
  });

  const channel2 = await prisma.clinicalChannel.upsert({
    where: { id: 'ch-test-002' },
    update: {},
    create: {
      id: 'ch-test-002',
      name: 'Test Oncology Center Ankara',
      city: 'Ankara',
      serviceCoverage: ['Cancer Surgery'],
      status: 'ACTIVE',
      contactMethods: JSON.stringify({ email: 'onco@testclinic.example.com' }),
      responseSlaHours: 24,
    },
  });
  console.log('✅ Clinical channels created');

  const provider1 = await prisma.provider.upsert({
    where: { id: 'prov-test-001' },
    update: {},
    create: {
      id: 'prov-test-001',
      displayName: 'Dr. Test Provider A',
      specialties: ['Plastic Surgery', 'Aesthetic Surgery'],
      channelId: channel1.id,
      status: 'ACTIVE',
    },
  });

  const provider2 = await prisma.provider.upsert({
    where: { id: 'prov-test-002' },
    update: {},
    create: {
      id: 'prov-test-002',
      displayName: 'Dr. Test Provider B',
      specialties: ['Oncological Surgery'],
      channelId: channel2.id,
      status: 'ACTIVE',
    },
  });
  console.log('✅ Providers created');

  // ============================================
  // 5. TEST CASES (5 cases with different statuses)
  // ============================================
  const cases = await Promise.all([
    // Case 1: New, unassigned
    prisma.case.upsert({
      where: { trackingCode: 'TRK-100001' },
      update: {},
      create: {
        trackingCode: 'TRK-100001',
        patientName: 'Test Patient Alpha',
        patientEmail: 'alpha@example.com',
        patientPhone: '+44 7700 000001',
        patientCountry: 'UK',
        patientCity: 'London',
        mainCategory: 'Aesthetic Surgery',
        aestheticSubCategory: 'Face',
        aestheticProcedure: 'Rhinoplasty',
        description: 'Interested in rhinoplasty consultation',
        consent1: true,
        consent1At: new Date(),
        consent2: true,
        consent2At: new Date(),
        status: CaseStatus.received,
      },
    }),

    // Case 2: Under review, assigned to PD via pool
    prisma.case.upsert({
      where: { trackingCode: 'TRK-100002' },
      update: {},
      create: {
        trackingCode: 'TRK-100002',
        patientName: 'Test Patient Beta',
        patientEmail: 'beta@example.com',
        patientPhone: '+49 170 0000002',
        patientCountry: 'DE',
        patientCity: 'Berlin',
        mainCategory: 'Medical Surgery',
        medicalSubType: 'Cancer Surgery',
        cancerSystem: 'GI System',
        description: 'Seeking second opinion for surgical options',
        consent1: true,
        consent1At: new Date(),
        consent2: true,
        consent2At: new Date(),
        consent3: true,
        consent3At: new Date(),
        status: CaseStatus.under_review,
        assignmentMode: AssignmentMode.POOL,
        assignedPdId: pds[1].id, // Mehmet
        assignedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        poolCity: 'Ankara',
        claimedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    }),

    // Case 3: Channel contacted, direct PD code
    prisma.case.upsert({
      where: { trackingCode: 'TRK-100003' },
      update: {},
      create: {
        trackingCode: 'TRK-100003',
        patientName: 'Test Patient Gamma',
        patientEmail: 'gamma@example.com',
        patientCountry: 'NL',
        patientCity: 'Amsterdam',
        mainCategory: 'Aesthetic Surgery',
        aestheticSubCategory: 'Body',
        aestheticProcedure: 'Liposuction',
        pdCodeProvided: 'PD-10001',
        consent1: true,
        consent1At: new Date(),
        consent2: true,
        consent2At: new Date(),
        status: CaseStatus.channel_contacted,
        assignmentMode: AssignmentMode.DIRECT_PD_CODE,
        assignedPdId: pds[0].id, // Ayşe
        assignedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        channelId: channel1.id,
        channelContactedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    }),

    // Case 4: Information ready
    prisma.case.upsert({
      where: { trackingCode: 'TRK-100004' },
      update: {},
      create: {
        trackingCode: 'TRK-100004',
        patientName: 'Test Patient Delta',
        patientEmail: 'delta@example.com',
        patientPhone: '+33 6 00 00 00 04',
        patientCountry: 'FR',
        patientCity: 'Paris',
        mainCategory: 'Medical Surgery',
        medicalSubType: 'General Surgery',
        generalCondition: 'Hernia',
        description: 'Inguinal hernia repair inquiry',
        consent1: true,
        consent1At: new Date(),
        consent2: true,
        consent2At: new Date(),
        status: CaseStatus.information_ready,
        assignmentMode: AssignmentMode.MANUAL_ADMIN,
        assignedPdId: pds[0].id, // Ayşe
        assignedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        channelId: channel1.id,
        providerId: provider1.id,
        channelContactedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        clinicRequestedDocsAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        patientSentDocsAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        clinicConfirmedDocsAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    }),

    // Case 5: Completed
    prisma.case.upsert({
      where: { trackingCode: 'TRK-100005' },
      update: {},
      create: {
        trackingCode: 'TRK-100005',
        patientName: 'Test Patient Epsilon',
        patientEmail: 'epsilon@example.com',
        patientCountry: 'UK',
        patientCity: 'Manchester',
        mainCategory: 'Aesthetic Surgery',
        aestheticSubCategory: 'Hair',
        aestheticProcedure: 'Hair Transplant',
        pdCodeProvided: 'PD-10001',
        consent1: true,
        consent1At: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        consent2: true,
        consent2At: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        status: CaseStatus.completed,
        assignmentMode: AssignmentMode.DIRECT_PD_CODE,
        assignedPdId: pds[0].id, // Ayşe
        assignedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        channelId: channel1.id,
        providerId: provider1.id,
        channelContactedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
        handoverAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);
  console.log('✅ Cases created:', cases.map(c => c.trackingCode).join(', '));

  // Add status history for some cases
  await prisma.caseStatusHistory.createMany({
    data: [
      { caseId: cases[1].id, status: CaseStatus.received, source: 'SYSTEM', note: 'Application submitted' },
      { caseId: cases[1].id, status: CaseStatus.under_review, source: 'ADMIN', changedById: superAdmin.id },
      { caseId: cases[2].id, status: CaseStatus.received, source: 'SYSTEM' },
      { caseId: cases[2].id, status: CaseStatus.under_review, source: 'ADMIN', changedById: superAdmin.id },
      { caseId: cases[2].id, status: CaseStatus.channel_contacted, source: 'ADMIN', changedById: superAdmin.id },
      { caseId: cases[4].id, status: CaseStatus.received, source: 'SYSTEM' },
      { caseId: cases[4].id, status: CaseStatus.under_review, source: 'ADMIN', changedById: superAdmin.id },
      { caseId: cases[4].id, status: CaseStatus.channel_contacted, source: 'ADMIN', changedById: superAdmin.id },
      { caseId: cases[4].id, status: CaseStatus.information_ready, source: 'ADMIN', changedById: superAdmin.id },
      { caseId: cases[4].id, status: CaseStatus.next_steps_shared, source: 'ADMIN', changedById: superAdmin.id },
      { caseId: cases[4].id, status: CaseStatus.confirmed, source: 'ADMIN', changedById: superAdmin.id },
      { caseId: cases[4].id, status: CaseStatus.completed, source: 'ADMIN', changedById: superAdmin.id },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Status history created');

  // Add some contact logs
  await prisma.contactLog.createMany({
    data: [
      {
        caseId: cases[2].id,
        actorType: 'ADMIN',
        actorId: superAdmin.id,
        direction: ContactDirection.OUTBOUND,
        method: ContactMethod.EMAIL,
        summary: 'Initial contact with patient to confirm requirements',
      },
      {
        caseId: cases[2].id,
        actorType: 'ADMIN',
        actorId: superAdmin.id,
        direction: ContactDirection.OUTBOUND,
        method: ContactMethod.EMAIL,
        summary: 'Contacted clinical channel for availability',
      },
      {
        caseId: cases[3].id,
        actorType: 'ADMIN',
        actorId: superAdmin.id,
        direction: ContactDirection.INBOUND,
        method: ContactMethod.PHONE,
        summary: 'Patient called to provide additional information',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Contact logs created');

  // Update PD case counters
  await prisma.pD.update({
    where: { id: pds[0].id },
    data: {
      casesClaimedCount: 3,
      casesActiveCount: 2,
      casesCompletedCount: 1,
    },
  });
  await prisma.pD.update({
    where: { id: pds[1].id },
    data: {
      casesClaimedCount: 1,
      casesActiveCount: 1,
      casesCompletedCount: 0,
    },
  });
  console.log('✅ PD counters updated');

  console.log('');
  console.log('🎉 Seed completed successfully!');
  console.log('');
  console.log('📋 Summary:');
  console.log('   - 1 Super Admin: admin@mrclinc.com');
  console.log('   - 3 Pools: Istanbul, Ankara, Izmir');
  console.log('   - 3 PDs: PD-10001, PD-10002, PD-10003');
  console.log('   - 2 Clinical Channels');
  console.log('   - 2 Providers');
  console.log('   - 5 Cases: TRK-100001 to TRK-100005');
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
