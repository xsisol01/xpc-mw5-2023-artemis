using AutoMapper;
using Eshop.webAPI.DTO;
using Eshop.webAPI.FakeDB;
using Eshop.webAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace Eshop.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufacturerController : ControllerBase
    {
        private readonly ILogger<ManufacturerController> logger;
        private readonly IMapper mapper;

        public ManufacturerController(ILogger<ManufacturerController> logger, IMapper mapper)
        {
            this.logger = logger;
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetManufacturers()
        {
            try
            {
                var manufacturers = FakeDatabase.Manufacturers;
                var results = mapper.Map<IList<ManufacturerDTO>>(manufacturers); //Convert to DTO for output
                return Ok(results);        //status 200 with data
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Something Went Wrong in the {nameof(GetManufacturers)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpGet("{name}", Name = "GetManufacturer")]
        public IActionResult GetManufacturerByName(string name)
        {
            try
            {
                var manufacturer = (from c in FakeDatabase.Manufacturers
                                    where c.Name == name
                                    select c).FirstOrDefault();
                var result = mapper.Map<CategoryDTO>(manufacturer); //Convert to DTO for output
                return Ok(result);        //status 200 with data
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Something Went Wrong in the {nameof(GetManufacturerByName)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpPost]
        public IActionResult CreateManufacturer([FromBody] CreateManufacturerDTO manufacturerDTO)
        {
            if (!ModelState.IsValid)
            {
                logger.LogError($"Invalid POST attempt in {nameof(CreateManufacturer)})");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
            try
            {
                var manufacturer = mapper.Map<ManufacturerModel>(manufacturerDTO);  //Convert to DTO for input
                FakeDatabase.AddManufacturer(manufacturer);

                return CreatedAtRoute("GetManufacturer", new { name = manufacturer.Name }, manufacturer);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Something Went Wrong in the {nameof(GetManufacturerByName)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }

        }
    }
}
