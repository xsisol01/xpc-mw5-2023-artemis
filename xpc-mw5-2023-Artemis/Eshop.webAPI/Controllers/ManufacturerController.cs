using AutoMapper;
using Eshop.webAPI.DTO;
using Eshop.webAPI.FakeDB;
using Eshop.webAPI.Models;
using Microsoft.AspNetCore.Mvc;

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
        public ActionResult<ManufacturerDTO> GetManufacturers()
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var manufacturers = FakeDatabase.Manufacturers;
                    var results = _mapper.Map<List<ManufacturerDTO>>(manufacturers);
                    _logger.LogInformation($"Proccessing of request successful");
                    return Ok(results);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(GetManufacturers)}");
                    return StatusCode(500, "Internal Server Error. Please Try Again Later.");
                }
            }
        }


        [HttpGet("byId/{id}", Name = "GetManufacturer")]
        public ActionResult<ManufacturerDTO> GetManufacturer(Guid id)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var manufacturer = FakeDatabase.Manufacturers.FirstOrDefault(m => m.Id == id);

                    if (manufacturer != null)
                    {
                        var result = _mapper.Map<ManufacturerDTO>(manufacturer);

                        _logger.LogInformation($"Proccessing of request successful");
                        return Ok(result);
                    }
                    else
                    {
                        _logger.LogWarning($"Manufacturer with ID {id} not found");
                        return NotFound();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(GetManufacturer)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }
        }

        [HttpGet("getCommodities/{id}", Name = "GetManufacturersCommodities")]
        public ActionResult<List<CommodityDTO>> GetManufacturersCommodities(Guid id)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var manufacturer = FakeDatabase.Manufacturers.FirstOrDefault(m => m.Id == id);

                    if (manufacturer != null)
                    {
                        var commodities = manufacturer.Commodities;
                        var result = _mapper.Map<List<CommodityDTO>>(commodities);

                        _logger.LogInformation($"Proccessing of request successful");
                        return Ok(result);
                    }
                    else
                    {
                        _logger.LogWarning($"Manufacturer with ID {id} not found");
                        return NotFound();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(GetManufacturer)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }
        }

        [HttpGet("byName/{name}")]
        public ActionResult<ManufacturerDTO> GetManufacturerByName(string name)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var manufacturer = FakeDatabase.Manufacturers.FirstOrDefault(m => m.Name == name);

                    if (manufacturer != null)
                    {
                        var result = _mapper.Map<ManufacturerDTO>(manufacturer);

                        _logger.LogInformation($"Proccessing of request successful");
                        return Ok(result);
                    }
                    else
                    {
                        _logger.LogWarning($"Manufacturer with name {name} not found");
                        return NotFound();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(GetManufacturerByName)}");
                    return StatusCode(500, "Internal Server Error. Please Try Again Later.");
                }
            }
        }


        [HttpPost]
        public ActionResult<ManufacturerDTO> CreateManufacturer([FromBody] CreateManufacturerDTO manufacturerDTO)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    if (FakeDatabase.Manufacturers.Any(m => m.Name == manufacturerDTO.Name))
                    {
                        _logger.LogWarning($"Manufacturer with name {manufacturerDTO.Name} already exists");
                        return Conflict();
                    }

                    var manufacturer = _mapper.Map<ManufacturerModel>(manufacturerDTO);
                    FakeDatabase.Manufacturers.Add(manufacturer);

                    var result = _mapper.Map<ManufacturerDTO>(manufacturer);

                    _logger.LogInformation($"Proccessing of request successful");
                    return CreatedAtRoute(nameof(GetManufacturer), new { id = result.Id }, result);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(CreateManufacturer)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<ManufacturerDTO> DeleteManufacturer(Guid id)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var manufacturer = FakeDatabase.Manufacturers.FirstOrDefault(m => m.Id == id);

                    if (manufacturer == null)
                    {
                        _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteManufacturer)}, No record with Id : {id}");
                        return NotFound("Manufacturer not found");
                    }

                    FakeDatabase.Manufacturers.Remove(manufacturer);

                    _logger.LogInformation($"Proccessing of request successful");
                    return NoContent();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(DeleteManufacturer)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }
        }


        [HttpPut("{id}")]
        public ActionResult<ManufacturerDTO> UpdateManufacturer(Guid id, [FromBody] CreateManufacturerDTO manufacturerDTO)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var existingManufacturer = FakeDatabase.Manufacturers.FirstOrDefault(m => m.Id == id);
                    if (existingManufacturer == null)
                    {
                        _logger.LogError($"Invalid attempt in {nameof(UpdateManufacturer)}, No record with Id : {id}");
                        return BadRequest("Manufacturer not found.");
                    }

                    var newManufacturer = _mapper.Map<ManufacturerModel>(manufacturerDTO);
                    if (FakeDatabase.Manufacturers.Any(m => m.Id != id && m.Name == newManufacturer.Name))
                    {
                        _logger.LogError($"Invalid attempt in {nameof(UpdateManufacturer)}, Already Existing Record with Id : {id}");
                        return BadRequest("Manufacturer name already exists.");
                    }

                    existingManufacturer.Name = newManufacturer.Name;
                    existingManufacturer.Country = newManufacturer.Country;
                    existingManufacturer.Description = newManufacturer.Description;
                    existingManufacturer.ImageUrl = newManufacturer.ImageUrl;

                    var updatedManufacturerDTO = _mapper.Map<ManufacturerModel>(manufacturerDTO);

                    _logger.LogInformation($"Proccessing of request successful");
                    return Ok(updatedManufacturerDTO);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(UpdateManufacturer)}");
                    return StatusCode(500, "Internal Server Error. Please Try Again Later.");
                }
            }
        }



    }
}
