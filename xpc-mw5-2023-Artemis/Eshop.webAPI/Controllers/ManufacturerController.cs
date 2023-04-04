using AutoMapper;
using Eshop.webAPI.DTO;
using Eshop.webAPI.FakeDB;
using Eshop.webAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Xml.Linq;

namespace Eshop.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufacturerController : ControllerBase
    {
        private readonly ILogger<ManufacturerController> _logger;
        private readonly IMapper _mapper;

        public ManufacturerController(ILogger<ManufacturerController> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetManufacturers()
        {
            try
            {
                // Retrieve all manufacturers from the database
                var manufacturers = FakeDatabase.Manufacturers;

                // Convert the manufacturers to DTOs for output
                var manufacturerDTOs = manufacturers.Select(m => _mapper.Map<ManufacturerDTO>(m)).ToList();

                // Return a response with the manufacturer DTOs
                return Ok(manufacturerDTOs);
            }
            catch (Exception ex)
            {
                // Log the error and return a generic error response
                _logger.LogError(ex, $"Something went wrong in {nameof(GetManufacturers)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }


        [HttpGet("{id}", Name = "GetManufacturer")]
        public IActionResult GetManufacturer(Guid id)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid POST attempt in {nameof(GetManufacturer)})");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
            try
            {
                var manufacturer = (from m in FakeDatabase.Manufacturers
                                    where m.Id == id
                                    select m).FirstOrDefault();
                var result = _mapper.Map<ManufacturerDTO>(manufacturer);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetManufacturer)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpGet("{name}")]
        public IActionResult GetManufacturerByName(string name)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid POST attempt in {nameof(GetManufacturerByName)})");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
            try
            {
                var manufacturer = (from m in FakeDatabase.Manufacturers
                                    where m.Name == name
                                    select m).FirstOrDefault();
                var result = _mapper.Map<ManufacturerDTO>(manufacturer);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetManufacturerByName)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpPost]
        public IActionResult CreateManufacturer([FromBody] CreateManufacturerDTO manufacturerDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid POST attempt in {nameof(CreateManufacturer)})");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
            try
            {
                var manufacturer = _mapper.Map<ManufacturerModel>(manufacturerDTO);  //Convert to DTO for input
                FakeDatabase.AddManufacturer(manufacturer);

                return CreatedAtRoute("GetManufacturer", new { name = manufacturer.Name }, manufacturer);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetManufacturerByName)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }

        }
        [HttpDelete("{id}")]
        public IActionResult DeleteManufacturer(Guid id)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteManufacturer)})");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
            try
            {
                var toDeleteManufacturer = (from m in FakeDatabase.Manufacturers
                                            where m.Id == id
                                            select m).FirstOrDefault();

                if (toDeleteManufacturer != null)
                {
                    FakeDatabase.Manufacturers.Remove(toDeleteManufacturer);
                }
                else
                {
                    _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteManufacturer)}");
                    return BadRequest("Submitted data is invalid");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(DeleteManufacturer)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateManufacturer(Guid id, [FromBody] CreateManufacturerDTO manufacturerDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateManufacturer)})");
                    return StatusCode(500, "Internal Server Error. Please Try Again Later.");
                }
               
                var toUpdateManufacturer = FakeDatabase.Manufacturers.FirstOrDefault(m => m.Id == id);

                if (toUpdateManufacturer == null)
                {
                    _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateManufacturer)})");
                    return BadRequest("Submitted data is invalid");
                }

                var updatedManufacturer = _mapper.Map<ManufacturerModel>(manufacturerDTO);
                toUpdateManufacturer.Name = updatedManufacturer.Name;
                toUpdateManufacturer.Country = updatedManufacturer.Country;
                toUpdateManufacturer.ImageUrl = updatedManufacturer.ImageUrl;
                toUpdateManufacturer.Description = updatedManufacturer.Description;

                return CreatedAtRoute("GetCategory", new { id = toUpdateManufacturer.Id }, toUpdateManufacturer);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdateManufacturer)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

    }
}
