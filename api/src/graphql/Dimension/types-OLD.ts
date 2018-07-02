import {
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLUnionType
} from "graphql";

type PrimaryDimension =
  | "physiological"
  | "safety"
  | "social"
  | "esteem"
  | "actualization";
const PrimaryDimension = new GraphQLEnumType({
  name: "PrimaryDimension",
  values: {
    PHYSIOLOGICAL: { value: "physiological" },
    SAFETY: { value: "safety" },
    SOCIAL: { value: "social" },
    ESTEEM: { value: "esteem" },
    ACTUALIZATION: { value: "actualization" }
  }
});
type PhysiologicalSubDimension =
  | "air"
  | "water"
  | "food"
  | "sleep"
  | "clothing"
  | "shelter"
  | "sex";
const PhysiologicalSubDimension = new GraphQLEnumType({
  name: "PhysiologicalSubDimension",
  values: {
    AIR: { value: "air" },
    WATER: { value: "water" },
    FOOD: { value: "food" },
    SLEEP: { value: "sleep" },
    CLOTHING: { value: "clothing" },
    SHELTER: { value: "shelter" },
    SEX: { value: "sex" }
  }
});
interface PhysiologicalDimension {
  primary: "physiological";
  secondary: PhysiologicalSubDimension[];
}
const PhysiologicalDimension = new GraphQLObjectType({
  name: "PhysiologicalDimension",
  fields: {
    primary: { type: new GraphQLNonNull(PrimaryDimension) },
    secondary: {
      type: new GraphQLNonNull(new GraphQLList(PhysiologicalSubDimension))
    }
  }
});
type SafetySubDimension =
  | "personal"
  | "financial"
  | "health"
  | "mental"
  | "surety";
const SafetySubDimension = new GraphQLEnumType({
  name: "SafetySubDimension",
  values: {
    PERSONAL: { value: "personal" },
    FINANCIAL: { value: "financial" },
    HEALTH: { value: "health" },
    MENTAL: { value: "mental" },
    SURETY: { value: "surety" }
  }
});
interface SafetyDimension {
  primary: "safety";
  secondary: SafetySubDimension[];
}
const SafetyDimension = new GraphQLObjectType({
  name: "SafetyDimension",
  fields: {
    primary: { type: new GraphQLNonNull(PrimaryDimension) },
    secondary: { type: new GraphQLNonNull(new GraphQLList(SafetySubDimension)) }
  }
});
type SocialSubDimension =
  | "communication"
  | "friendship"
  | "intimacy"
  | "community"
  | "family"
  | "love";
const SocialSubDimension = new GraphQLEnumType({
  name: "SocialSubDimension",
  values: {
    COMMUNICATION: { value: "communication" },
    FRIENDSHIPS: { value: "friendship" },
    INTIMACY: { value: "intimacy" },
    COMMUNITY: { value: "community" },
    FAMILY: { value: "family" },
    LOVE: { value: "love" }
  }
});
interface SocialDimension {
  primary: "social";
  secondary: SocialSubDimension[];
}
const SocialDimension = new GraphQLObjectType({
  name: "SocialDimension",
  fields: {
    primary: { type: new GraphQLNonNull(PrimaryDimension) },
    secondary: { type: new GraphQLNonNull(new GraphQLList(SocialSubDimension)) }
  }
});
type EsteemSubDimension = "acceptance" | "hope" | "happiness" | "esteem";
const EsteemSubDimension = new GraphQLEnumType({
  name: "EsteemSubDimension",
  values: {
    ACCEPTANCE: { value: "acceptance" },
    HOPE: { value: "hope" },
    HAPPY: { value: "happiness" },
    ESTEEM: { value: "esteem" }
  }
});
interface EsteemDimension {
  primary: "esteem";
  secondary: EsteemSubDimension[];
}
const EsteemDimension = new GraphQLObjectType({
  name: "EsteemDimension",
  fields: {
    primary: { type: new GraphQLNonNull(PrimaryDimension) },
    secondary: { type: new GraphQLNonNull(new GraphQLList(EsteemSubDimension)) }
  }
});
type ActualizationSubDimension =
  | "thinking"
  | "learning"
  | "choice"
  | "beliefs"
  | "principles"
  | "fulfillment"
  | "helping";
const ActualizationSubDimension = new GraphQLEnumType({
  name: "ActualizationSubDimension",
  values: {
    THINKING: { value: "thinking" },
    LEARNING: { value: "learning" },
    CHOICE: { value: "choice" },
    BELIEF: { value: "beliefs" },
    PRINCIPLE: { value: "principles" },
    FULFILLMENT: { value: "fulfillment" },
    HELPING: { value: "helping" }
  }
});
interface ActualizationDimension {
  primary: "actualization";
  secondary: ActualizationSubDimension[];
}
const ActualizationDimension = new GraphQLObjectType({
  name: "ActualizationDimension",
  fields: {
    primary: { type: new GraphQLNonNull(PrimaryDimension) },
    secondary: {
      type: new GraphQLNonNull(new GraphQLList(ActualizationSubDimension))
    }
  }
});
export type Dimension =
  | PhysiologicalDimension
  | SafetyDimension
  | SocialDimension
  | EsteemDimension
  | ActualizationDimension;
export const Dimension = new GraphQLUnionType({
  name: "Dimension",
  types: [
    PhysiologicalDimension,
    SafetyDimension,
    SocialDimension,
    EsteemDimension,
    ActualizationDimension
  ],
  resolveType: (dimension: Dimension) => {
    switch (dimension.primary) {
      case "physiological":
        return PhysiologicalDimension;
      case "safety":
        return SafetyDimension;
      case "social":
        return SocialDimension;
      case "esteem":
        return EsteemDimension;
      case "actualization":
      default:
        return ActualizationDimension;
    }
  }
});
