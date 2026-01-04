"use client";

import { useState, ReactNode } from "react";

// ============================================
// ACCORDION TYPES
// ============================================

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

interface AccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}

// ============================================
// ACCORDION ITEM COMPONENT
// ============================================

function AccordionItemComponent({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${item.id}`}
      >
        <span className="text-base font-medium text-gray-900">{item.title}</span>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        id={`accordion-content-${item.id}`}
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-[1000px] pb-4" : "max-h-0"
        }`}
        role="region"
        aria-labelledby={`accordion-button-${item.id}`}
      >
        <div className="text-gray-600 text-sm leading-relaxed">{item.content}</div>
      </div>
    </div>
  );
}

// ============================================
// ACCORDION COMPONENT
// ============================================

function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className = "",
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const handleToggle = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setOpenItems((prev) =>
        prev.includes(itemId) ? [] : [itemId]
      );
    }
  };

  return (
    <div className={`divide-y divide-gray-200 ${className}`}>
      {items.map((item) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isOpen={openItems.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}

export { Accordion, type AccordionProps, type AccordionItem };
