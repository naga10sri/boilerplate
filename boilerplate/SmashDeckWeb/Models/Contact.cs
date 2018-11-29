using System;
using System.Collections.Generic;

namespace SmashDeck.Models
{
    public partial class Contact
    {
        public int Id { get; set; }
        public string Name1 { get; set; }
        public string Address1 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string DirectParentName1 { get; set; }
        public string TopParentName1 { get; set; }
        public string FacilityType { get; set; }
        public string RelationshipToParent { get; set; }
        public string MaterialManagerName { get; set; }
        public string MaterialManagerPhone { get; set; }
        public string MaterialManagerFax { get; set; }
        public string DirectorOfPharmacy { get; set; }
        public string DirectorOfPharmacyPhone { get; set; }
        public string LicensedBeds { get; set; }
    }
}
