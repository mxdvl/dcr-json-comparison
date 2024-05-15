import { z } from "./zod.ts";
import { capiFormatSchema } from "./capi.ts";

const thirdPartyEmbeddedContentSchema = z.object({
  isThirdPartyTracking: z.boolean(),
  source: z.string().optional(),
  sourceDomain: z.string().optional(),
});

const audioBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.AudioBlockElement"),
  elementId: z.string(),
});

const blockquoteBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.BlockquoteBlockElement"),
  elementId: z.string(),
  html: z.string(),
  quoted: z.boolean().optional(),
});

const captionBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.CaptionBlockElement"),
  elementId: z.string(),
  captionText: z.string().optional(),
  padCaption: z.boolean().optional(),
  credit: z.string().optional(),
  displayCredit: z.boolean().optional(),
  shouldLimitWidth: z.boolean().optional(),
  isOverlaid: z.boolean().optional(),
});

const codeBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.CodeBlockElement"),
  elementId: z.string(),
  html: z.string(),
  isMandatory: z.boolean(),
  language: z.string().optional(),
});

const contentAtomBlockElementSchema = z.object({
  _type: z.literal(
    "model.dotcomrendering.pageElements.ContentAtomBlockElement",
  ),
  elementId: z.string(),
  atomId: z.string(),
});

const dividerBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.DividerBlockElement"),
  size: z.union([z.literal("full"), z.literal("partial")]).optional(),
  spaceAbove: z.union([z.literal("tight"), z.literal("loose")]).optional(),
});

const genericAtomBlockElementSchema = z.object({
  _type: z.literal(
    "model.dotcomrendering.pageElements.GenericAtomBlockElement",
  ),
  url: z.string(),
  placeholderUrl: z.string().optional(),
  id: z.string().optional(),
  html: z.string().optional(),
  css: z.string().optional(),
  js: z.string().optional(),
  elementId: z.string(),
});

const highlightBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.HighlightBlockElement"),
  elementId: z.string(),
  html: z.string(),
});

const itemLinkBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.ItemLinkBlockElement"),
  elementId: z.string(),
  html: z.string(),
});

const numberedTitleBlockElementSchema = z.object({
  _type: z.literal(
    "model.dotcomrendering.pageElements.NumberedTitleBlockElement",
  ),
  elementId: z.string(),
  position: z.number(),
  html: z.string(),
  format: capiFormatSchema,
});

const pullquoteBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.PullquoteBlockElement"),
  elementId: z.string(),
  html: z.string().optional(),
  role: z.string(),
  attribution: z.string().optional(),
  isThirdPartyTracking: z.boolean().optional(),
});

const subheadingBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.SubheadingBlockElement"),
  elementId: z.string(),
  html: z.string(),
});

const textBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.TextBlockElement"),
  elementId: z.string(),
  dropCap: z.boolean().optional(),
  html: z.string(),
});

const vineBlockElementSchema = thirdPartyEmbeddedContentSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.VineBlockElement"),
  elementId: z.string(),
  url: z.string(),
  height: z.number(),
  width: z.number(),
  originalUrl: z.string(),
  title: z.string(),
});

const witnessTypeDataBaseSchema = z.object({
  authorUsername: z.string(),
  authorGuardianProfileUrl: z.string(),
  originalUrl: z.string(),
  source: z.string(),
  title: z.string(),
  url: z.string(),
  dateCreated: z.string(),
  apiUrl: z.string(),
  authorName: z.string(),
  witnessEmbedType: z.string(),
  html: z.string().optional(),
  authorWitnessProfileUrl: z.string(),
});

const witnessTypeDataImageSchema = witnessTypeDataBaseSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.WitnessTypeDataImage"),
  type: z.literal("image"),
  alt: z.string(),
  caption: z.string(),
  mediaId: z.string(),
  photographer: z.string(),
});

const witnessTypeDataVideoSchema = witnessTypeDataBaseSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.WitnessTypeDataVideo"),
  type: z.literal("video"),
  description: z.string(),
  youtubeHtml: z.string(),
  youtubeDescription: z.string(),
  youtubeUrl: z.string(),
  width: z.number(),
  youtubeSource: z.string(),
  youtubeAuthorName: z.string(),
  height: z.number(),
  youtubeTitle: z.string(),
});

const witnessTypeDataTextSchema = witnessTypeDataBaseSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.WitnessTypeDataText"),
  type: z.literal("text"),
  description: z.string(),
  authorUsername: z.string(),
  originalUrl: z.string(),
  source: z.string(),
  title: z.string(),
  url: z.string(),
  dateCreated: z.string(),
  apiUrl: z.string(),
  authorName: z.string(),
  witnessEmbedType: z.string(),
  authorWitnessProfileUrl: z.string(),
});

const witnessAssetTypeSchema = z.object({
  type: z.literal("Image"),
  mimeType: z.literal("image/jpeg"),
  file: z.string(),
  typeData: z.object({
    name: z.string(),
  }),
});

const witnessTypeBlockElementSchema = thirdPartyEmbeddedContentSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.WitnessBlockElement"),
  elementId: z.string(),
  assets: z.array(witnessAssetTypeSchema),
  isThirdPartyTracking: z.boolean(),
  witnessTypeData: z.union([
    witnessTypeDataImageSchema,
    witnessTypeDataVideoSchema,
    witnessTypeDataTextSchema,
  ]),
});

const weightingSchema = z.enum([
  "inline",
  "thumbnail",
  "supporting",
  "showcase",
  "halfwidth",
  "immersive",
  "richLink",
]);

const roleTypeSchema = z.enum([
  "immersive",
  "supporting",
  "showcase",
  "inline",
  "thumbnail",
  "halfWidth",
]);

const srcSetItemSchema = z.object({
  src: z.string(),
  width: z.number(),
});

const imageSchema = z.object({
  index: z.number(),
  fields: z.object({
    height: z.string(),
    width: z.string(),
    isMaster: z.string().optional(),
    source: z.string().optional(),
    caption: z.string().optional(),
  }),
  mediaType: z.string(),
  mimeType: z.string(),
  url: z.string(),
});

const videoAssetsSchema = z.object({
  url: z.string(),
  mimeType: z.string(),
  fields: z
    .object({
      source: z.string().optional(),
      embeddable: z.string().optional(),
      height: z.string().optional(),
      width: z.string().optional(),
      caption: z.string().optional(),
    })
    .optional(),
});

const timelineEventSchema = z.object({
  title: z.string(),
  date: z.string(),
  unixDate: z.number(),
  body: z.string().optional(),
  toDate: z.string().optional(),
  toUnixDate: z.number().optional(),
});

const ratingSizeTypeSchema = z.enum(["large", "medium", "small"]);

const campaignFieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  required: z.boolean(),
  textSize: z.number().optional(),
  hideLabel: z.boolean(),
  label: z.string(),
});

const campaignFieldTextSchema = campaignFieldSchema.extend({
  type: z.literal("text"),
});

const campaignFieldTextAreaSchema = campaignFieldSchema.extend({
  type: z.literal("textarea"),
});

const campaignFieldFileSchema = campaignFieldSchema.extend({
  type: z.literal("file"),
});

const campaignFieldRadioSchema = campaignFieldSchema.extend({
  type: z.literal("radio"),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
});

const campaignFieldCheckboxSchema = campaignFieldSchema.extend({
  type: z.literal("checkbox"),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
});

const campaignFieldSelectSchema = campaignFieldSchema.extend({
  type: z.literal("select"),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
});

const answerTypeSchema = z.object({
  id: z.string(),
  text: z.string(),
  revealText: z.string().optional(),
  isCorrect: z.boolean(),
  answerBuckets: z.array(z.string()),
});

const questionTypeSchema = z.object({
  id: z.string(),
  text: z.string(),
  answers: z.array(answerTypeSchema),
  imageUrl: z.string().optional(),
});

const resultBucketsTypeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

const newsletterSchema = z.object({
  listId: z.number(),
  identityName: z.string(),
  name: z.string(),
  description: z.string(),
  frequency: z.string(),
  successDescription: z.string(),
  theme: z.string(),
  group: z.string(),
});

const audioAtomBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.AudioAtomBlockElement"),
  elementId: z.string(),
  id: z.string(),
  kicker: z.string(),
  title: z.string().optional(),
  trackUrl: z.string(),
  duration: z.number(),
  coverUrl: z.string(),
  role: roleTypeSchema.optional(),
});

const chartAtomBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.ChartAtomBlockElement"),
  elementId: z.string(),
  id: z.string(),
  url: z.string(),
  html: z.string(),
  css: z.string().optional(),
  js: z.string().optional(),
  role: roleTypeSchema.optional(),
  placeholderUrl: z.string().optional(),
});

const quizAtomBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.QuizAtomBlockElement"),
  elementId: z.string(),
  quizType: z.enum(["personality", "knowledge"]),
  id: z.string(),
  questions: z.array(questionTypeSchema),
  resultBuckets: z.array(resultBucketsTypeSchema),
  resultGroups: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      shareText: z.string(),
      minScore: z.number(),
    }),
  ),
});

const commentBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.CommentBlockElement"),
  elementId: z.string(),
  body: z.string(),
  avatarURL: z.string(),
  profileURL: z.string(),
  profileName: z.string(),
  permalink: z.string(),
  dateTime: z.string(),
  role: roleTypeSchema.optional(),
});

const disclaimerBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.DisclaimerBlockElement"),
  elementId: z.string(),
  html: z.string(),
  role: roleTypeSchema.optional(),
});

const documentBlockElementSchema = thirdPartyEmbeddedContentSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.DocumentBlockElement"),
  elementId: z.string(),
  embedUrl: z.string(),
  height: z.number(),
  width: z.number(),
  title: z.string().optional(),
  role: roleTypeSchema.optional(),
});

const embedBlockElementSchema = thirdPartyEmbeddedContentSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.EmbedBlockElement"),
  elementId: z.string(),
  safe: z.boolean().optional(),
  role: roleTypeSchema.optional(),
  alt: z.string().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
  html: z.string(),
  isMandatory: z.boolean(),
  caption: z.string().optional(),
});

const explainerAtomBlockElementSchema = z.object({
  _type: z.literal(
    "model.dotcomrendering.pageElements.ExplainerAtomBlockElement",
  ),
  elementId: z.string(),
  id: z.string(),
  title: z.string(),
  body: z.string(),
  role: roleTypeSchema.optional(),
});

const guideAtomBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.GuideAtomBlockElement"),
  elementId: z.string(),
  id: z.string(),
  label: z.string(),
  title: z.string(),
  img: z.string().optional(),
  html: z.string(),
  credit: z.string(),
  role: roleTypeSchema.optional(),
});

const guVideoBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.GuVideoBlockElement"),
  elementId: z.string(),
  assets: z.array(videoAssetsSchema),
  caption: z.string(),
  html: z.string(),
  source: z.string(),
  role: roleTypeSchema.optional(),
  imageMedia: z
    .object({
      allImages: z.array(imageSchema),
    })
    .optional(),
  originalUrl: z.string().optional(),
  url: z.string().optional(),
});

const instagramBlockElementSchema = thirdPartyEmbeddedContentSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.InstagramBlockElement"),
  elementId: z.string(),
  html: z.string(),
  url: z.string(),
  hasCaption: z.boolean(),
  role: roleTypeSchema.optional(),
});

const interactiveAtomBlockElementSchema = z.object({
  _type: z.literal(
    "model.dotcomrendering.pageElements.InteractiveAtomBlockElement",
  ),
  elementId: z.string(),
  url: z.string(),
  id: z.string(),
  js: z.string().optional(),
  html: z.string().optional(),
  css: z.string().optional(),
  placeholderUrl: z.string().optional(),
  role: roleTypeSchema.optional(),
});

const interactiveBlockElementSchema = z.object({
  _type: z.literal(
    "model.dotcomrendering.pageElements.InteractiveBlockElement",
  ),
  elementId: z.string(),
  url: z.string().optional(),
  isMandatory: z.boolean().optional(),
  scriptUrl: z.string().optional(),
  alt: z.string().optional(),
  role: roleTypeSchema.optional(),
  caption: z.string().optional(),
});

const mapBlockElementSchema = thirdPartyEmbeddedContentSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.MapBlockElement"),
  elementId: z.string(),
  embedUrl: z.string(),
  originalUrl: z.string(),
  title: z.string(),
  height: z.number(),
  width: z.number(),
  caption: z.string().optional(),
  role: roleTypeSchema.optional(),
});

const mediaAtomBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.MediaAtomBlockElement"),
  elementId: z.string(),
  id: z.string(),
  assets: z.array(videoAssetsSchema),
  posterImage: z
    .array(
      z.object({
        url: z.string(),
        width: z.number(),
      }),
    )
    .optional(),
  title: z.string().optional(),
  duration: z.number().optional(),
});

const newsletterSignupBlockElementSchema = z.object({
  _type: z.literal(
    "model.dotcomrendering.pageElements.NewsletterSignupBlockElement",
  ),
  newsletter: newsletterSchema,
  elementId: z.string().optional(),
});

const interactiveContentsBlockElementSchema = z.object({
  _type: z.literal(
    "model.dotcomrendering.pageElements.InteractiveContentsBlockElement",
  ),
  elementId: z.string(),
  subheadingLinks: z.array(subheadingBlockElementSchema),
  endDocumentElementId: z.string().optional(),
});

const profileAtomBlockElementSchema = z.object({
  _type: z.literal(
    "model.dotcomrendering.pageElements.ProfileAtomBlockElement",
  ),
  elementId: z.string(),
  id: z.string(),
  label: z.string(),
  title: z.string(),
  img: z.string().optional(),
  html: z.string(),
  credit: z.string(),
  role: roleTypeSchema.optional(),
});

const qABlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.QABlockElement"),
  elementId: z.string(),
  id: z.string(),
  title: z.string(),
  img: z.string().optional(),
  html: z.string(),
  credit: z.string(),
  role: roleTypeSchema.optional(),
});

const richLinkBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.RichLinkBlockElement"),
  elementId: z.string(),
  url: z.string(),
  text: z.string(),
  prefix: z.string(),
  role: weightingSchema.optional(),
});

const soundcloudBlockElementSchema = thirdPartyEmbeddedContentSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.SoundcloudBlockElement"),
  elementId: z.string(),
  html: z.string(),
  id: z.string(),
  isTrack: z.boolean(),
  isMandatory: z.boolean(),
  role: roleTypeSchema.optional(),
});

const spotifyBlockElementSchema = thirdPartyEmbeddedContentSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.SpotifyBlockElement"),
  elementId: z.string(),
  embedUrl: z.string().optional(),
  title: z.string().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
  caption: z.string().optional(),
  role: roleTypeSchema.optional(),
});

const starRatingBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.StarRatingBlockElement"),
  elementId: z.string(),
  rating: z.number(),
  size: ratingSizeTypeSchema,
});

const tableBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.TableBlockElement"),
  elementId: z.string(),
  isMandatory: z.boolean(),
  html: z.string(),
  role: roleTypeSchema.optional(),
});

const timelineBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.TimelineBlockElement"),
  elementId: z.string(),
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  events: z.array(timelineEventSchema),
  role: roleTypeSchema.optional(),
});

const tweetBlockElementSchema = thirdPartyEmbeddedContentSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.TweetBlockElement"),
  elementId: z.string(),
  html: z.string(),
  url: z.string(),
  id: z.string(),
  hasMedia: z.boolean(),
  role: roleTypeSchema.optional(),
});

const videoBlockElementSchema = thirdPartyEmbeddedContentSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.VideoBlockElement"),
  elementId: z.string(),
  role: roleTypeSchema.optional(),
});

const videoFacebookBlockElementSchema = thirdPartyEmbeddedContentSchema.extend({
  _type: z.literal(
    "model.dotcomrendering.pageElements.VideoFacebookBlockElement",
  ),
  elementId: z.string(),
  url: z.string(),
  height: z.number(),
  width: z.number(),
  caption: z.string().optional(),
  embedUrl: z.string().optional(),
  role: roleTypeSchema.optional(),
});

const videoVimeoBlockElementSchema = thirdPartyEmbeddedContentSchema.extend({
  _type: z.literal("model.dotcomrendering.pageElements.VideoVimeoBlockElement"),
  elementId: z.string(),
  embedUrl: z.string().optional(),
  url: z.string(),
  height: z.number(),
  width: z.number(),
  caption: z.string().optional(),
  credit: z.string().optional(),
  title: z.string().optional(),
  originalUrl: z.string().optional(),
  role: roleTypeSchema.optional(),
});

const videoYoutubeBlockElementSchema = thirdPartyEmbeddedContentSchema.extend({
  _type: z.literal(
    "model.dotcomrendering.pageElements.VideoYoutubeBlockElement",
  ),
  elementId: z.string(),
  embedUrl: z.string().optional(),
  url: z.string(),
  originalUrl: z.string(),
  height: z.number(),
  width: z.number(),
  caption: z.string().optional(),
  credit: z.string().optional(),
  title: z.string().optional(),
  role: roleTypeSchema.optional(),
});

const youtubeBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.YoutubeBlockElement"),
  elementId: z.string(),
  assetId: z.string(),
  mediaTitle: z.string(),
  id: z.string(),
  channelId: z.string().optional(),
  duration: z.number().optional(),
  posterImage: z
    .array(
      z.object({
        url: z.string(),
        width: z.number(),
      }),
    )
    .optional(),
  expired: z.boolean(),
  overrideImage: z.string().optional(),
  altText: z.string().optional(),
  role: roleTypeSchema.optional(),
});

const imageSourceSchema = z.object({
  weighting: weightingSchema,
  srcSet: z.array(srcSetItemSchema),
});

const campaignFieldTypeSchema = z.union([
  campaignFieldTextSchema,
  campaignFieldTextAreaSchema,
  campaignFieldFileSchema,
  campaignFieldRadioSchema,
  campaignFieldCheckboxSchema,
  campaignFieldSelectSchema,
]);

const calloutBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.CalloutBlockElement"),
  elementId: z.string(),
  id: z.string(),
  calloutsUrl: z.string(),
  activeFrom: z.number(),
  displayOnSensitive: z.boolean(),
  formId: z.number(),
  title: z.string(),
  description: z.string(),
  tagName: z.string(),
  formFields: z.array(campaignFieldTypeSchema),
  role: roleTypeSchema.optional(),
});

const imageBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.ImageBlockElement"),
  elementId: z.string(),
  media: z.object({
    allImages: z.array(imageSchema),
  }),
  data: z.object({
    alt: z.string().optional(),
    credit: z.string().optional(),
    caption: z.string().optional(),
    copyright: z.string().optional(),
  }),
  imageSources: z.array(imageSourceSchema),
  displayCredit: z.boolean().optional(),
  role: roleTypeSchema,
  title: z.string().optional(),
  starRating: z.number().optional(),
  isAvatar: z.boolean().optional(),
});

const multiImageBlockElementSchema = z.object({
  _type: z.literal("model.dotcomrendering.pageElements.MultiImageBlockElement"),
  elementId: z.string(),
  images: z.array(imageBlockElementSchema),
  caption: z.string().optional(),
  role: roleTypeSchema.optional(),
});

export const feElementSchema = z.union([
  audioAtomBlockElementSchema,
  audioBlockElementSchema,
  blockquoteBlockElementSchema,
  captionBlockElementSchema,
  calloutBlockElementSchema,
  chartAtomBlockElementSchema,
  codeBlockElementSchema,
  commentBlockElementSchema,
  contentAtomBlockElementSchema,
  disclaimerBlockElementSchema,
  dividerBlockElementSchema,
  documentBlockElementSchema,
  embedBlockElementSchema,
  explainerAtomBlockElementSchema,
  genericAtomBlockElementSchema,
  guideAtomBlockElementSchema,
  guVideoBlockElementSchema,
  highlightBlockElementSchema,
  imageBlockElementSchema,
  instagramBlockElementSchema,
  interactiveAtomBlockElementSchema,
  interactiveContentsBlockElementSchema,
  interactiveBlockElementSchema,
  itemLinkBlockElementSchema,
  mapBlockElementSchema,
  mediaAtomBlockElementSchema,
  multiImageBlockElementSchema,
  numberedTitleBlockElementSchema,
  newsletterSignupBlockElementSchema,
  profileAtomBlockElementSchema,
  pullquoteBlockElementSchema,
  qABlockElementSchema,
  quizAtomBlockElementSchema,
  richLinkBlockElementSchema,
  soundcloudBlockElementSchema,
  spotifyBlockElementSchema,
  starRatingBlockElementSchema,
  subheadingBlockElementSchema,
  tableBlockElementSchema,
  textBlockElementSchema,
  timelineBlockElementSchema,
  tweetBlockElementSchema,
  videoBlockElementSchema,
  videoFacebookBlockElementSchema,
  videoVimeoBlockElementSchema,
  videoYoutubeBlockElementSchema,
  vineBlockElementSchema,
  youtubeBlockElementSchema,
  witnessTypeBlockElementSchema,
]);
