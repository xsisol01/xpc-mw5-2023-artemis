using AutoMapper;
using Eshop.webAPI.DTO;
using Eshop.webAPI.FakeDB;
using Eshop.webAPI.Models;
using Microsoft.AspNetCore.Http;
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
        public IActionResult GetCommodities()
        {
            try
            {
                var commodities = FakeDatabase.Commodities;
                var results = _mapper.Map<List<CommodityDTO>>(commodities);
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in {nameof(GetCommodities)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }


        [HttpGet("byId/{id}")]
        public IActionResult GetCommodity(Guid id)
        {
            try
            {
                var commodity = FakeDatabase.Commodities.FirstOrDefault(c => c.Id == id);

                if (commodity != null)
                {
                    var result = _mapper.Map<CommodityDTO>(commodity);
                    return Ok(result);
                }
                else
                {
                    _logger.LogWarning($"Commodity with ID '{id}' not found");
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in {nameof(GetCommodity)}");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }


        [HttpGet("byName/{name}")]
        public IActionResult GetCommodityByName(string name)
        {
            try
            {
                var commodity = FakeDatabase.Commodities.FirstOrDefault(c => c.Name == name);

                if (commodity != null)
                {
                    var result = _mapper.Map<CommodityDTO>(commodity);
                    return Ok(result);
                }
                else
                {
                    _logger.LogWarning($"Commodity with name '{name}' not found");
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in {nameof(GetCommodityByName)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }


        [HttpPost]
        public IActionResult CreateCommodity([FromBody] CreateCommodityDTO commodityDTO)
        {
            try
            {
                if (FakeDatabase.Commodities.Any(c => c.Name == commodityDTO.Name))
                {
                    _logger.LogWarning($"Commodity with name '{commodityDTO.Name}' already exists");
                    return Conflict();
                }

                var commodity = _mapper.Map<CommodityModel>(commodityDTO);
                FakeDatabase.AddCommodity(commodity);

                var result = _mapper.Map<CommodityDTO>(commodity);
                return CreatedAtRoute("GetCommodity", new { id = result.Id }, result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in {nameof(CreateCommodity)}");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCommodity(Guid id)
        {
            try
            {
                var commodity = FakeDatabase.Commodities.FirstOrDefault(c => c.Id == id);

                if (commodity == null)
                {
                    _logger.LogWarning($"Could not find commodity with id '{id}'");
                    return NotFound();
                }

                FakeDatabase.Commodities.Remove(commodity);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong while deleting commodity with id '{id}'");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }


        [HttpPut("{id}")]
        public IActionResult UpdateCommodity(Guid id, [FromBody] CreateCommodityDTO commodityDTO)
        {
            try
            {
                var existingCommodity = FakeDatabase.Commodities.FirstOrDefault(c => c.Id == id);
                if (existingCommodity == null)
                {
                    _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateCommodity)})");
                    return BadRequest("Commodity not found.");
                }

                var newCommodity = _mapper.Map<CommodityModel>(commodityDTO);
                if (FakeDatabase.Commodities.Any(c => c.Id != id && c.Name == newCommodity.Name))
                {
                    _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateCommodity)})");
                    return BadRequest("Commodity name already exists.");
                }

                existingCommodity.Name = newCommodity.Name;
                var updatedCommodityDTO = _mapper.Map<CommodityModel>(commodityDTO);
                return Ok(updatedCommodityDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdateCommodity)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }
    }
}

