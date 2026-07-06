import type { BlogPost } from "@/types/blog";
import ranchoCucamongaPost from "./pest-control-rancho-cucamonga";
import mosquitoRanchoCucamongaPost from "./mosquito-control-rancho-cucamonga";
import ecoFriendlyInlandEmpirePost from "./eco-friendly-pest-control-inland-empire";
import petSafeRanchoCucamongaPost from "./pet-safe-pest-control-rancho-cucamonga";
import pestControlUplandPost from "./pest-control-upland-ca";
import antControlUplandCa from "./ant-control-upland-ca";
import spiderControlRanchoCucamongaPost from "./spider-control-rancho-cucamonga";

export const BLOG_POSTS: BlogPost[] = [
  spiderControlRanchoCucamongaPost,
  antControlUplandCa,
  pestControlUplandPost,
  ranchoCucamongaPost,
  mosquitoRanchoCucamongaPost,
  ecoFriendlyInlandEmpirePost,
  petSafeRanchoCucamongaPost,
];
