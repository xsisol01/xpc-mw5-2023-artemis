using Eshop.webAPI.FakeDB;
using Eshop.webAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace Eshop.webAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProducerController
    {

        [HttpGet(Name = "GetProducers")]
        public IEnumerable<ProducerModel> Get()
        {
            return FakeDb.getProducers()
            .ToArray();
        }

        [HttpPost]
        public ActionResult Create(ProducerModel producer)
        {
            // Add the employee to the database //vytvorenie fake dat zatial vbec nefunguje
            producer.Name = "parkside";
            producer.Description = "ohhgh";
            producer.ImageUrl = "lol";
            

            FakeDb.addProducer(producer);

            // Redirect the user to the index page
            return RedirectToAction("Index");
        }

        private ActionResult RedirectToAction(string v)
        {
            throw new NotImplementedException();
        }
    }
}
