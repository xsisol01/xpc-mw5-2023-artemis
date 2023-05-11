using AutoMapper;
using Eshop.webAPI.DTO;
using Eshop.webAPI.FakeDB;
using Eshop.webAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommodityController : ControllerBase
    {
        private readonly ILogger<CommodityController> _logger;
        private readonly IMapper _mapper;

        public CommodityController(ILogger<CommodityController> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<CommodityDTO>> GetCommodities()
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var commodities = FakeDatabase.Commodities;
                    var results = _mapper.Map<List<CommodityDTO>>(commodities);

                    _logger.LogInformation($"Proccessing of request successful");
                    return Ok(results);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(GetCommodities)}");
                    return StatusCode(500, "Internal Server Error. Please Try Again Later.");
                }
            }
        }


        [HttpGet("byId/{id}", Name = "GetCommodity")]
        public ActionResult<CommodityDTO> GetCommodity(Guid id)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var commodity = FakeDatabase.Commodities.FirstOrDefault(c => c.Id == id);

                    if (commodity != null)
                    {
                        var result = _mapper.Map<CommodityDTO>(commodity);
                        _logger.LogInformation($"Proccessing of request successful");
                        return Ok(result);
                    }
                    else
                    {
                        _logger.LogWarning($"Commodity with ID {id} not found");
                        return NotFound();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(GetCommodity)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }
        }

        [HttpGet("byListOfId", Name = "GetCommodities")]
        public ActionResult<List<CommodityDTO>> GetCommodities([FromQuery] List<Guid> ids)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var commodities = new List<CommodityModel>();
                    foreach (var id in ids)
                    {
                        var commodity = FakeDatabase.Commodities.FirstOrDefault(c => c.Id == id);
                        if (commodity != null)
                        {
                            commodities.Add(commodity);
                        }
                        else
                        {
                            _logger.LogWarning($"Commodity with ID {id} not found");
                            return NotFound();
                        }
                    }

                    var results = _mapper.Map<List<CommodityDTO>>(commodities);

                    _logger.LogInformation($"Proccessing of request successful");
                    return Ok(results);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(GetCommodities)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }
        }


        [HttpGet("byName/{name}")]
        public ActionResult<CommodityDTO> GetCommodityByName(string name)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var commodity = FakeDatabase.Commodities.FirstOrDefault(c => c.Name == name);

                    if (commodity != null)
                    {
                        var result = _mapper.Map<CommodityDTO>(commodity);

                        _logger.LogInformation("Proccessing of request successful");
                        return Ok(result);
                    }
                    else
                    {
                        _logger.LogWarning($"Commodity with name {name} not found");
                        return NotFound();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(GetCommodityByName)}");
                    return StatusCode(500, "Internal Server Error. Please Try Again Later.");
                }
            }
        }


        [HttpPost]
        public ActionResult<CommodityDTO> CreateCommodity([FromBody] CreateCommodityDTO commodityDTO)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    if (FakeDatabase.Commodities.Any(c => c.Name == commodityDTO.Name))
                    {
                        _logger.LogWarning($"Commodity with name {commodityDTO.Name} already exists");
                        return Conflict();
                    }

                    var commodity = _mapper.Map<CommodityModel>(commodityDTO);
                    FakeDatabase.Commodities.Add(commodity);

                    var result = _mapper.Map<CommodityDTO>(commodity);

                    _logger.LogInformation($"Proccessing of request successful");
                    return CreatedAtRoute(nameof(GetCommodity), new { id = result.Id }, result);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(CreateCommodity)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<CommodityDTO> DeleteCommodity(Guid id)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var commodity = FakeDatabase.Commodities.FirstOrDefault(c => c.Id == id);

                    if (commodity == null)
                    {
                        _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteCommodity)}, No record with Id : {id}");
                        return NotFound("Commodity not found");
                    }

                    FakeDatabase.Commodities.Remove(commodity);

                    _logger.LogInformation($"Proccessing of request successful");
                    return NoContent();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(DeleteCommodity)}");
                    return StatusCode(500, "Internal Server Error. Please Try Again Later.");
                }
            }
        }


        [HttpPut("{id}")]
        public ActionResult<CommodityDTO> UpdateCommodity(Guid id, [FromBody] CreateCommodityDTO commodityDTO)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var existingCommodity = FakeDatabase.Commodities.FirstOrDefault(c => c.Id == id);
                    if (existingCommodity == null)
                    {
                        _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateCommodity)}, No record with Id : {id}");
                        return BadRequest("Commodity not found.");
                    }

                    var newCommodity = _mapper.Map<CommodityModel>(commodityDTO);
                    if (FakeDatabase.Commodities.Any(c => c.Id != id && c.Name == newCommodity.Name))
                    {
                        _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateCommodity)}, Already Existing Record with Id : {id}");
                        return BadRequest("Commodity name already exists.");
                    }

                    existingCommodity.Name = newCommodity.Name;
                    existingCommodity.Weight = newCommodity.Weight;
                    existingCommodity.Price = newCommodity.Price;
                    existingCommodity.Manufacturer = newCommodity.Manufacturer;
                    existingCommodity.Category = newCommodity.Category;
                    existingCommodity.StockQuantity = newCommodity.StockQuantity;
                    existingCommodity.Description = newCommodity.Description;
                    existingCommodity.ImageUrl = newCommodity.ImageUrl;

                    var updatedCommodityDTO = _mapper.Map<CommodityModel>(commodityDTO);

                    _logger.LogInformation($"Proccessing of request successful");
                    return Ok(updatedCommodityDTO);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(UpdateCommodity)}");
                    return StatusCode(500, "Internal Server Error. Please Try Again Later.");
                }
            }
        }
    }
}

