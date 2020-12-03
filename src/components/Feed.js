import Card from "./Card.js";
import Section from "./Section.js";

export default function Feed({ data }) {
  return data.categories.map(({ id, type, tracts }) => (
    <Section key={id} title={type}>
      {tracts.map(({ title, ...rest }) => (
        <Card key={rest.id} {...rest}>
          {title}
        </Card>
      ))}
    </Section>
  ));
}
