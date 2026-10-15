import type { InteriorContent } from "@/content/interiors";
import {
  AboutHubLayout,
  EventsLayout,
  ManagementLayout,
  NewsLayout,
  ReportLayout,
  StoryLayout,
} from "./interiors/AboutLayouts";
import {
  ContactFormLayout,
  ContactHubLayout,
  DefaultLayout,
  LocationsLayout,
  SearchLayout,
  UtilityFormLayout,
} from "./interiors/ContactLayouts";
import {
  CareersLayout,
  InvestorsLayout,
  SuppliersDetailLayout,
  SuppliersHubLayout,
  SustainabilityLayout,
  SustainabilityPillarLayout,
} from "./interiors/CorporateLayouts";
import {
  CustomersHubLayout,
  SegmentLayout,
} from "./interiors/CustomersLayouts";
import {
  ProductsDetailLayout,
  ProductsHubLayout,
} from "./interiors/ProductsLayouts";

/**
 * Dispatches each route to a section-specific layout.
 * Families share patterns; different families look intentionally different.
 */
export default function InteriorPage({ content }: { content: InteriorContent }) {
  switch (content.template) {
    case "hub-about":
      return <AboutHubLayout content={content} />;
    case "story":
      return <StoryLayout content={content} />;
    case "news":
      return <NewsLayout content={content} />;
    case "events":
      return <EventsLayout content={content} />;
    case "management":
      return <ManagementLayout content={content} />;
    case "report":
      return <ReportLayout content={content} />;
    case "hub-products":
      return <ProductsHubLayout content={content} />;
    case "products":
      return <ProductsDetailLayout content={content} />;
    case "hub-customers":
      return <CustomersHubLayout content={content} />;
    case "segment":
      return <SegmentLayout content={content} />;
    case "hub-suppliers":
      return <SuppliersHubLayout content={content} />;
    case "suppliers":
      return <SuppliersDetailLayout content={content} />;
    case "investors":
      return <InvestorsLayout content={content} />;
    case "careers":
      return <CareersLayout content={content} />;
    case "sustainability":
      return <SustainabilityLayout content={content} />;
    case "sustainability-pillar":
      return <SustainabilityPillarLayout content={content} />;
    case "hub-contact":
      return <ContactHubLayout content={content} />;
    case "contact":
      return <ContactFormLayout content={content} />;
    case "locations":
      return <LocationsLayout content={content} />;
    case "form":
      return <UtilityFormLayout content={content} />;
    case "search":
      return <SearchLayout content={content} />;
    default:
      return <DefaultLayout content={content} />;
  }
}
