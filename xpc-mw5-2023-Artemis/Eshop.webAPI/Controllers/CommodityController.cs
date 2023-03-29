using AutoMapper;
using Eshop.webAPI.DTO;
using Eshop.webAPI.FakeDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommodityController : ControllerBase
    {
        private readonly ILogger<CommodityController> logger;
        private readonly IMapper mapper;

        public CommodityController(ILogger<CommodityController> logger, IMapper mapper)
        {
            this.logger = logger;
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetCommodities()
        {
            try
            {
                var commodities = FakeDatabase.Commodities;
                //var results = _mapper.Map<IList<CategoryDTO>>(categories); //Convert to DTO for output
                return Ok(commodities);        //status 200 with data
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Something Went Wrong in the {nameof(GetCommodities)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpGet("{name}", Name = "GetCommodity")]
        public IActionResult GetCommodityByName(string name)
        {
            try
            {
                var commodity = (from c in FakeDatabase.Commodities
                                 where c.Name == name
                                 select c).FirstOrDefault();
                //var result = _mapper.Map<CategoryDTO>(category); //Convert to DTO for output
                return Ok(commodity);        //status 200 with data
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Something Went Wrong in the {nameof(GetCommodityByName)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }
    }
}

