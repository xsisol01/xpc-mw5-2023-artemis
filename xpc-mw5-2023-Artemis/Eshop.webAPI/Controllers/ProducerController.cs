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
    }
}
