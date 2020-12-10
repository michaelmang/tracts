import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Card from "./Card.js";
import Section from "./Section.js";
import { useWindowSize } from '../hooks.js';

const defaultOffset = 0;
const defaultLimit = 4;
const md = 768; // size of medium breakpoint according to tailwindcss: https://tailwindcss.com/docs/responsive-design

export default function Feed({ data }) {
  const size = useWindowSize();
  
  const [limit, setLimit] = useState(defaultLimit);
  const [offset, setOffset] = useState(defaultOffset);
  const [expandedSection, setExpandedSection] = useState(null);

  const expandSection = (id) => () => {
    if (id === expandedSection) {
      setOffset(offset + defaultLimit);
      setLimit(limit + defaultLimit);
      return;
    }

    setExpandedSection(id);
    setOffset(defaultOffset);
    setLimit(defaultLimit + defaultLimit);
  };

  const getLimitRange = (id) => expandedSection === id
    ? [offset, limit]
    : [defaultOffset, defaultLimit];

  return data.categories.map(({ id, type, tracts }) => {
    const [currentOffset, currentLimit] = getLimitRange(id, tracts);
    return (
      <Section key={id} title={type}>
        {tracts.slice(currentOffset, currentLimit).map(({ title, ...rest }) => (
          <Card key={rest.id} {...rest}>
            {title}
          </Card>
        ))}
        {tracts.length > defaultLimit && currentLimit < tracts.length && (
          <FontAwesomeIcon
            className={`${size.width < md ? 'ml-0 mb-8' : 'ml-8 mb-0'} self-center cursor-pointer`}
            color="white"
            icon={size.width < md ? faChevronDown : faChevronRight}
            onClick={expandSection(id)}
            size="3x"
          />
        )}
      </Section>
    );
  });
}
