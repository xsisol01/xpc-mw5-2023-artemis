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
    public class CategoryController : ControllerBase
    {
        private readonly ILogger<CategoryController> _logger;
        private readonly IMapper _mapper;

        public CategoryController(ILogger<CategoryController> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetCategories()
        {
            try
            {
                var categories = FakeDatabase.Categories;
                var results = _mapper.Map<IList<CategoryDTO>>(categories); //Convert to DTO for output
                return Ok(results);        //status 200 with data
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetCategories)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpGet("{name}", Name = "GetCategory")]
        public IActionResult GetCategoryByName(string name)
        {
            try
            {
                var category = (from c in FakeDatabase.Categories
                                where c.Name == name
                                select c).FirstOrDefault();
                var result = _mapper.Map<CategoryDTO>(category); //Convert to DTO for output
                return Ok(result);        //status 200 with data
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetCategoryByName)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpPost]
        public IActionResult CreateCategory([FromBody] CreateCategoryDTO categoryDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid POST attempt in {nameof(CreateCategory)})");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
            try
            {
                var category = _mapper.Map<Category>(categoryDTO);  //Convert to DTO for input
                FakeDatabase.AddCategory(category);

                return CreatedAtRoute("GetCategory", new { name = category.Name }, category);        
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetCategoryByName)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }

        }
    }
}
