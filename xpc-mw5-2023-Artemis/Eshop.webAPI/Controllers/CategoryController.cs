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
            try
            {
                var categories = FakeDatabase.Categories;
                var results = _mapper.Map<IList<CategoryDTO>>(categories);
                return Ok(results); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in {nameof(GetCategories)}");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }

        [HttpGet("byId/{id}")]
        public IActionResult GetCategory(Guid id)
        {
            try
            {
                var category = FakeDatabase.Categories.FirstOrDefault(c => c.Id == id);

                if (category != null)
                {
                    var result = _mapper.Map<CategoryDTO>(category);
                    return Ok(result);
                }
                else
                {
                    _logger.LogWarning($"Category with ID {id} not found");
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in {nameof(GetCategory)}");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }


        [HttpGet("byName/{name}")]
        public IActionResult GetCategoryByName(string name)
        {
            try
            {
                var category = FakeDatabase.Categories.FirstOrDefault(c => c.Name == name);

                if (category != null)
                {
                    var result = _mapper.Map<CategoryDTO>(category);
                    return Ok(result);
                }
                else
                {
                    _logger.LogWarning($"Category with name '{name}' not found");
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in {nameof(GetCategoryByName)}");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }


        [HttpPost]
        public IActionResult CreateCategory([FromBody] CreateCategoryDTO categoryDTO)
        {
            try
            {
                if (FakeDatabase.Categories.Any(c => c.Name == categoryDTO.Name))
                {
                    _logger.LogWarning($"Category with name '{categoryDTO.Name}' already exists");
                    return Conflict();
                }

                var category = _mapper.Map<CategoryModel>(categoryDTO);
                FakeDatabase.AddCategory(category);

                var result = _mapper.Map<CategoryDTO>(category);
                return CreatedAtRoute("GetCategory", new { id = category.Id }, result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in {nameof(CreateCategory)}");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }



        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(Guid id)
        {
            try
            {
                var category = FakeDatabase.Categories.FirstOrDefault(c => c.Id == id);

                if (category == null)
                {
                    _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteCategory)}");
                    return BadRequest("Category not found");
                }

                FakeDatabase.Categories.Remove(category);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(DeleteCategory)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }


        [HttpPut("{id}")]
        public IActionResult UpdateCategory(Guid id, [FromBody] CreateCategoryDTO categoryDTO)
        {
            try
            {
                var existingCategory = FakeDatabase.Categories.FirstOrDefault(c => c.Id == id);
                if (existingCategory == null)
                {
                    _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateCategory)})");
                    return BadRequest("Category not found.");
                }

                var newCategory = _mapper.Map<CategoryModel>(categoryDTO);
                if (FakeDatabase.Categories.Any(c => c.Id != id && c.Name == newCategory.Name))
                {
                    _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateCategory)})");
                    return BadRequest("Category name already exists.");
                }

                existingCategory.Name = newCategory.Name;
                var updatedCategoryDTO = _mapper.Map<CategoryDTO>(existingCategory);
                return Ok(updatedCategoryDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdateCategory)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }



    }
}
