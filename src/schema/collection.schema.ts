import { Collection, Document } from "mongodb";

export interface Collections_schema {
    allServiceCollection: Collection<Document>;
    allReviewCollection: Collection<Document>;
    allBlogsCollection: Collection<Document>;
    allVenue: Collection<Document>;
    allBookingCollection: Collection<Document>;
    allBookingVenueCollection: Collection<Document>;
    userCollection: Collection<Document>;
    allFirst4FaqQuestion: Collection<Document>;
    allSubServicesCollection: Collection<Document>;
    allTicketBookingCollection: Collection<Document>;
    allCommentCollection: Collection<Document>;
    allEmployee: Collection<Document>;
    allPackage: Collection<Document>;
    allWedding: Collection<Document>;
    allBirthday: Collection<Document>;
    allWalima: Collection<Document>;
    allIftarParty: Collection<Document>;
    allCatering: Collection<Document>;
    allLighting: Collection<Document>;
    allAudioVisual: Collection<Document>;
    allBannerImages: Collection<Document>;
}

export const collectionList: {
    [collection_name in keyof Collections_schema]: string;
} = {
    allServiceCollection: "all-service",
    allReviewCollection: "all-review",
    allBlogsCollection: "all-Blogs",
    allVenue: "all-venue",
    allBookingCollection: "all-booking",
    allBookingVenueCollection: "all-booking-venue",
    userCollection: "all-users",
    allFirst4FaqQuestion: "all-first4-faq-question",
    allSubServicesCollection: "all-sub-services",
    allTicketBookingCollection: "all-ticket-booking",
    allCommentCollection: "all-comment-collection",
    allEmployee: "all-employee",
    allPackage: "all-package",
    allWedding: "all-wedding",
    allBirthday: "all-birthday",
    allWalima: "all-walima",
    allIftarParty: "all-iftar-party",
    allCatering: "all-catering",
    allLighting: "all-lighting",
    allAudioVisual: "all-audiovisual",
    allBannerImages: "all-banner-img",
};
