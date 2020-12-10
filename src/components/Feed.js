import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Card from "./Card.js";
import Section from "./Section.js";
import { useWindowSize } from '../hooks.js';

const defaultLimit = 4;
const effectivelyNoLimit = undefined; // slice(0, undefined) ==> returns full list
const md = 768; // size of medium breakpoint according to tailwindcss: https://tailwindcss.com/docs/responsive-design

export default function Feed({ data }) {
  const size = useWindowSize();
  
  const [expandedSection, setExpandedSection] = useState(null);

  const expandSection = (id) => () => {
    setExpandedSection(id);
  };

  const getLimit = (id) => expandedSection === id ? effectivelyNoLimit : defaultLimit;

  return data.categories.map(({ id, type, tracts }) => {
    const limit = getLimit(id);
    return (
      <Section key={id} title={type}>
        {tracts.slice(0, limit).map(({ title, ...rest }) => (
          <Card key={rest.id} {...rest}>
            {title}
          </Card>
        ))}
        {tracts.length > defaultLimit && limit !== effectivelyNoLimit && (
          <FontAwesomeIcon
            className={`${size.width < md ? 'ml-0' : 'ml-8'} mb-8 self-center cursor-pointer`}
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
