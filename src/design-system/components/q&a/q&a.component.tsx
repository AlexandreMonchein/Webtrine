import DOMPurify from "dompurify";
import React, { useEffect, useRef, useState } from "react";

import {
  AccordionBody,
  AccordionContainer,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  ChevronIcon,
  Container,
  EmptyState,
  Header,
  QuestionText,
  Section,
  Subtitle,
  Tab,
  TabPanel,
  TabsContainer,
  TabsList,
  Title,
} from "./q&a.styled";
import { QAItem, QAProps } from "./q&a.types";

const ChevronDownIcon = () => (
  <path
    fillRule="evenodd"
    d="M18.2546728,8.18171329 L18.9617796,8.88882007 L12.5952867,15.2537133 L12.5978964,15.2558012 L11.8907896,15.962908 L11.8882867,15.9607133 L11.8874628,15.9617796 L11.180356,15.2546728 L11.1812867,15.2527133 L4.81828671,8.88882007 L5.52539349,8.18171329 L11.8882867,14.5457133 L18.2546728,8.18171329 Z"
  />
);

const AccordionItemComponent: React.FC<{
  item: QAItem;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ item, isExpanded, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setMaxHeight(height);
    }
  }, [item.answer, isExpanded]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onToggle();
  };

  return (
    <AccordionItem>
      <AccordionHeader
        $isExpanded={isExpanded}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${item.id}`}
        id={`accordion-header-${item.id}`}
        tabIndex={0}
        role="button"
      >
        <QuestionText>{item.question}</QuestionText>
        <ChevronIcon
          $isExpanded={isExpanded}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <ChevronDownIcon />
        </ChevronIcon>
      </AccordionHeader>
      <AccordionContent
        $isExpanded={isExpanded}
        $maxHeight={maxHeight}
        tabIndex={isExpanded ? 0 : -1}
      >
        <AccordionBody
          ref={contentRef}
          id={`accordion-content-${item.id}`}
          role="region"
          aria-labelledby={`accordion-header-${item.id}`}
          tabIndex={isExpanded ? 0 : -1}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(item.answer),
          }}
        />
      </AccordionContent>
    </AccordionItem>
  );
};

const QAComponent: React.FC<QAProps> = ({
  features,
  title,
  subtitle,
  content,
}) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const { hasCategories = false, allowMultipleOpen = false } = features;
  const { categories = [], items = [] } = content;

  useEffect(() => {
    if (hasCategories && categories.length > 0) {
      setActiveTab(categories[0].id);
    }
  }, [hasCategories, categories]);

  const handleTabChange = (categoryId: string) => {
    setActiveTab(categoryId);
    setExpandedItems(new Set());
  };

  const handleTabKeyDown = (event: React.KeyboardEvent, categoryId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleTabChange(categoryId);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const currentIndex = categories.findIndex((cat) => cat.id === activeTab);
      let newIndex;

      if (event.key === "ArrowLeft") {
        newIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
      } else {
        newIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
      }

      const newCategoryId = categories[newIndex].id;
      handleTabChange(newCategoryId);

      setTimeout(() => {
        const newTab = document.getElementById(`tab-${newCategoryId}`);
        if (newTab) {
          newTab.focus();
        }
      }, 0);
    }
  };

  const handleAccordionToggle = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        if (!allowMultipleOpen) {
          newSet.clear();
        }
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const getCurrentItems = (): QAItem[] => {
    if (hasCategories && categories.length > 0) {
      const activeCategory = categories.find((cat) => cat.id === activeTab);
      return activeCategory?.items || [];
    }
    return items;
  };

  const currentItems = getCurrentItems();

  return (
    <Section>
      <Container>
        {(title || subtitle) && (
          <Header>
            {title && <Title tabIndex={0}>{title}</Title>}
            {subtitle && <Subtitle tabIndex={0}>{subtitle}</Subtitle>}
          </Header>
        )}

        {hasCategories && categories.length > 0 && (
          <TabsContainer>
            <TabsList role="tablist" aria-label="FAQ Categories">
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  $isActive={activeTab === category.id}
                  onClick={() => handleTabChange(category.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, category.id)}
                  role="tab"
                  aria-selected={activeTab === category.id}
                  aria-controls={`tabpanel-${category.id}`}
                  id={`tab-${category.id}`}
                  tabIndex={activeTab === category.id ? 0 : -1}
                >
                  {category.label}
                </Tab>
              ))}
            </TabsList>
          </TabsContainer>
        )}

        {hasCategories && categories.length > 0 ? (
          categories.map((category) => (
            <TabPanel
              key={category.id}
              $isVisible={activeTab === category.id}
              role="tabpanel"
              id={`tabpanel-${category.id}`}
              aria-labelledby={`tab-${category.id}`}
            >
              {category.items.length > 0 ? (
                <AccordionContainer>
                  {category.items.map((item) => (
                    <AccordionItemComponent
                      key={item.id}
                      item={item}
                      isExpanded={expandedItems.has(item.id)}
                      onToggle={() => handleAccordionToggle(item.id)}
                    />
                  ))}
                </AccordionContainer>
              ) : (
                <EmptyState>
                  <span className="sr-only">
                    Aucune question disponible dans cette catégorie
                  </span>
                  Aucune question disponible
                </EmptyState>
              )}
            </TabPanel>
          ))
        ) : (
          <div role="main">
            {currentItems.length > 0 ? (
              <AccordionContainer>
                {currentItems.map((item) => (
                  <AccordionItemComponent
                    key={item.id}
                    item={item}
                    isExpanded={expandedItems.has(item.id)}
                    onToggle={() => handleAccordionToggle(item.id)}
                  />
                ))}
              </AccordionContainer>
            ) : (
              <EmptyState>
                <span className="sr-only">Aucune question disponible</span>
                Aucune question disponible
              </EmptyState>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
};

export default QAComponent;
