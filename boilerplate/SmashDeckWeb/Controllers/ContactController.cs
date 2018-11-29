using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmashDeck.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmashDeck.Controllers
{
    [Route("contact")]
    public class ContactController : ControllerBase
    {
        SmashDeckContext context = new SmashDeckContext();
        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            List<Contact> ObjectName = context.Contact.ToList();
            return ObjectName;
        }

        [HttpGet("{cityList}")]
        public IEnumerable<string> GetCities()
        {
            var result = context.Contact.Select(m => m.City).Distinct();
            return result.ToList();
        }

        [HttpGet("nameList")]
        public IEnumerable<string> GetNames()
        {
            var result = context.Contact.Select(m => m.Name1).Distinct();
            return result.ToList();
        }

        [HttpGet("{id}")]
        public async Task<Contact> Get(int id)
        {
            Contact details = await context.Contact.FindAsync(id);
                return details;
        }

        [HttpPost]
        public List<Contact> Search([FromBody] Contact contact)
        {
            var filter = new List<Contact>();

            if (contact.City != null)
            {
                 filter = (from city in context.Contact 
                           where city.City == contact.City 
                              select  city).ToList();
            }
           else if(contact.Name1 !=null)
            {
                 filter = (from name in context.Contact
                              where name.Name1 == contact.Name1
                              select name).ToList();
            }
            else if (contact.State != null)
            {
                filter = (from state in context.Contact
                          where state.State == contact.State
                          select state).ToList();
            }

            return filter;
        }

        [HttpGet("cities")]
        public dynamic cityList()
        {

            var query = context.Contact
                .GroupBy(p => new { p.City })
                .Select(g => new { name = g.Key.City, count = g.Count() });

            return query;
        }

        //[HttpPost("contactImport")]
        //public IActionResult ImportUsers(IFormFile file)
        //{

        //    using (ExcelPackage package = new ExcelPackage(file.OpenReadStream()))
        //    {
        //        ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
        //        int rowCount = worksheet.Dimension.Rows;
        //        int colCount = worksheet.Dimension.Columns;
        //        var context = new SmashDeckContext();

        //        for (int row = 2; row <= rowCount; row++)
        //        {
        //            try
        //            {
        //                var contact = new Contact();

        //                contact.Name1 = worksheet.Cells[row, 1].Text;
        //                contact.Address1 = worksheet.Cells[row, 2].Text;
        //                contact.City = worksheet.Cells[row, 3].Text;
        //                contact.State = worksheet.Cells[row, 4].Text;
        //                contact.PostalCode = worksheet.Cells[row, 5].Text;
        //                contact.Country = worksheet.Cells[row, 6].Text;
        //                contact.Phone = worksheet.Cells[row, 7].Text;
        //                contact.Fax = worksheet.Cells[row, 8].Text;
        //                contact.DirectParentName1 = worksheet.Cells[row, 9].Text;
        //                contact.TopParentName1 = worksheet.Cells[row, 10].Text;
        //                contact.FacilityType = worksheet.Cells[row, 11].Text;
        //                contact.RelationshipToParent = worksheet.Cells[row, 12].Text;
        //                contact.MaterialManagerName = worksheet.Cells[row, 13].Text;
        //                contact.MaterialManagerPhone = worksheet.Cells[row, 14].Text;
        //                contact.MaterialManagerFax = worksheet.Cells[row, 15].Text;
        //                contact.DirectorOfPharmacy = worksheet.Cells[row, 16].Text;
        //                contact.DirectorOfPharmacyPhone = worksheet.Cells[row, 17].Text;
        //                contact.LicensedBeds = worksheet.Cells[row, 18].Text;

        //                context.Contact.Add(contact);
        //                context.SaveChanges();

        //            }

        //            catch (Exception ex)
        //            {
        //                Console.WriteLine(ex);
        //            }
        //        }

        //    }
        //    return Ok();
        //}
    }
}
