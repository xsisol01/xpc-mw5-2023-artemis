using AutoMapper;
using Eshop.webAPI.DTO;
using Eshop.webAPI.FakeDB;
using Eshop.webAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Data;
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
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid GET attempt in {nameof(GetCategories)})");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
            try
            {
                var categories = FakeDatabase.Categories;
                var results = _mapper.Map<IList<CategoryDTO>>(categories);  //Convert to DTO for output
                return Ok(results);                                         //return 200
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetCategories)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpGet("{id}", Name = "GetCategory")]
        public IActionResult GetCategory(Guid id)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid GET attempt in {nameof(GetCategory)})");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
            try
            {
                var category = (from c in FakeDatabase.Categories
                                where c.Id == id
                                select c).FirstOrDefault();
                if (category != null)
                {
                    var result = _mapper.Map<CategoryDTO>(category);
                    return Ok(result);
                }
                else
                {
                    _logger.LogError($"Invalid GET attempt in {nameof(GetCategory)})");
                    return BadRequest("Submitted data is invalid");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(GetCategory)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpGet("{name}")]
        public IActionResult GetCategoryByName(string name)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid GET attempt in {nameof(GetCategoryByName)})");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
            try
            {
                var category = (from c in FakeDatabase.Categories
                                where c.Name == name
                                select c).FirstOrDefault();
                if (category != null)
                {
                    var result = _mapper.Map<CategoryDTO>(category);
                    return Ok(result);
                }
                else
                {
                    _logger.LogError($"Invalid GET attempt in {nameof(GetCategoryByName)})");
                    return BadRequest("Submitted data is invalid");
                }
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
                var category = _mapper.Map<CategoryModel>(categoryDTO);                          //Convert to DTO for input
                if (FakeDatabase.Categories.Any(c => c.Name == category.Name))
                {
                    _logger.LogError($"Invalid POST attempt in {nameof(CreateCategory)})");     //if record with same name already exists
                    return BadRequest("Submitted data is invalid");
                }
                else
                {
                    FakeDatabase.AddCategory(category);
                    return CreatedAtRoute("GetCategory", new { name = category.Name }, category);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(CreateCategory)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }

        }

        
        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(Guid id)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteCategory)})");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
            try
            {
                var toDeleteCategory = (from c in FakeDatabase.Categories
                                        where c.Id == id
                                        select c).FirstOrDefault();

                if(toDeleteCategory != null)
                {
                    FakeDatabase.Categories.Remove(toDeleteCategory);
                }
                else
                {
                    _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteCategory)}");
                    return BadRequest("Submitted data is invalid");
                }
       
                return NoContent();        
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(DeleteCategory)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCategory(Guid id,[FromBody]CreateCategoryDTO categoryDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateCategory)})");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
            try
            {
                var newCategory = _mapper.Map<CategoryModel>(categoryDTO);
                var toUpdateCategory = (from c in FakeDatabase.Categories
                                       where c.Id == id
                                       select c).FirstOrDefault();

                if (toUpdateCategory != null)
                {
                    toUpdateCategory.Name = newCategory.Name;
                    return CreatedAtRoute("GetCategory", new { name = toUpdateCategory.Name }, toUpdateCategory);
                }
                else
                {
                    _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateCategory)})");
                    return BadRequest("Submitted data is invalid");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdateCategory)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }
        

    }
}
