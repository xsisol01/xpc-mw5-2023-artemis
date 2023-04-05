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
                var manufacturers = FakeDatabase.Manufacturers;
                var results = _mapper.Map<List<ManufacturerDTO>>(manufacturers);
                
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in {nameof(GetManufacturers)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }


        [HttpGet("byId/{id}")]
        public IActionResult GetManufacturer(Guid id)
        {
            try
            {
                var manufacturer = FakeDatabase.Manufacturers.FirstOrDefault(m => m.Id == id);

                if (manufacturer != null)
                {
                    var result = _mapper.Map<ManufacturerDTO>(manufacturer);
                    return Ok(result);
                }
                else
                {
                    _logger.LogWarning($"Manufacturer with ID '{id}' not found");
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in {nameof(GetManufacturer)}");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }


        [HttpGet("byName/{name}")]
        public IActionResult GetManufacturerByName(string name)
        {
            try
            {
                var manufacturer = FakeDatabase.Manufacturers.FirstOrDefault(m => m.Name == name);

                if (manufacturer != null)
                {
                    var result = _mapper.Map<ManufacturerDTO>(manufacturer);
                    return Ok(result);
                }
                else
                {
                    _logger.LogWarning($"Manufacturer with name '{name}' not found");
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in {nameof(GetManufacturerByName)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }


        [HttpPost]
        public IActionResult CreateManufacturer([FromBody] CreateManufacturerDTO manufacturerDTO)
        {
            try
            {
                if (FakeDatabase.Manufacturers.Any(m => m.Name == manufacturerDTO.Name))
                {
                    _logger.LogWarning($"Category with name '{manufacturerDTO.Name}' already exists");
                    return Conflict();
                }

                var manufacturer = _mapper.Map<ManufacturerModel>(manufacturerDTO);
                FakeDatabase.AddManufacturer(manufacturer);

                var result = _mapper.Map<ManufacturerDTO>(manufacturer);
                return CreatedAtRoute("GetManufacturer", new { id = result.Id }, result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in {nameof(CreateManufacturer)}");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteManufacturer(Guid id)
        {
            try
            {
                var manufacturer = FakeDatabase.Manufacturers.FirstOrDefault(m => m.Id == id);

                if (manufacturer == null)
                {
                    _logger.LogWarning($"Could not find manufacturer with id '{id}'");
                    return NotFound();
                }

                FakeDatabase.Manufacturers.Remove(manufacturer);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong while deleting manufacturer with id '{id}'");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }


        [HttpPut("{id}")]
        public IActionResult UpdateManufacturer(Guid id, [FromBody] CreateManufacturerDTO manufacturerDTO)
        {
            try
            {
                var existingManufacturer = FakeDatabase.Manufacturers.FirstOrDefault(m => m.Id == id);
                if (existingManufacturer == null)
                {
                    _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateManufacturer)})");
                    return BadRequest("Manufacturer not found.");
                }

                var newManufacturer = _mapper.Map<ManufacturerModel>(manufacturerDTO);
                if (FakeDatabase.Manufacturers.Any(m => m.Id != id && m.Name == newManufacturer.Name))
                {
                    _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateManufacturer)})");
                    return BadRequest("Manufacturer name already exists.");
                }

                existingManufacturer.Name = newManufacturer.Name;
                var updatedManufacturerDTO = _mapper.Map<ManufacturerModel>(manufacturerDTO);
                return Ok(updatedManufacturerDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdateManufacturer)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }



    }
}
