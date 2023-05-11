using AutoMapper;
using Eshop.WebAPI.DTO;
using Eshop.WebAPI.FakeDB;
using Eshop.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.WebAPI.Controllers
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
        public ActionResult<List<CategoryDTO>> GetCategories()
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var categories = FakeDatabase.Categories;
                    var results = _mapper.Map<IList<CategoryDTO>>(categories);
                    _logger.LogInformation($"Proccessing of request successful");
                    return Ok(results);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(GetCategories)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }

        }

        [HttpGet("byId/{id}", Name = "GetCategory")]
        public ActionResult<CategoryDTO> GetCategory(Guid id)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var category = FakeDatabase.Categories.FirstOrDefault(c => c.Id == id);

                    if (category != null)
                    {
                        var result = _mapper.Map<CategoryDTO>(category);

                        _logger.LogInformation("Proccessing of request successful");
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
        }


        [HttpGet("byName/{name}")]
        public ActionResult<CategoryDTO> GetCategoryByName(string name)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var category = FakeDatabase.Categories.FirstOrDefault(c => c.Name == name);

                    if (category != null)
                    {
                        var result = _mapper.Map<CategoryDTO>(category);

                        _logger.LogInformation("Proccessing of request successful");
                        return Ok(result);
                    }
                    else
                    {
                        _logger.LogWarning($"Category with name {name} not found");
                        return NotFound();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(GetCategoryByName)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }
        }


        [HttpPost]
        public ActionResult<CategoryDTO> CreateCategory([FromBody] CreateCategoryDTO categoryDTO)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    if (FakeDatabase.Categories.Any(c => c.Name == categoryDTO.Name))
                    {
                        _logger.LogWarning($"Category with name {categoryDTO.Name} already exists");
                        return Conflict();
                    }

                    var category = _mapper.Map<CategoryModel>(categoryDTO);
                    FakeDatabase.Categories.Add(category);

                    var result = _mapper.Map<CategoryDTO>(category);

                    _logger.LogInformation($"Proccessing of request successful");
                    return CreatedAtRoute(nameof(GetCategory), new { id = result.Id }, result);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(CreateCategory)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }
        }


        [HttpDelete("{id}")]
        public ActionResult<CategoryDTO> DeleteCategory(Guid id)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var category = FakeDatabase.Categories.FirstOrDefault(c => c.Id == id);

                    if (category == null)
                    {
                        _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteCategory)}, No record with Id : {id}");
                        return NotFound("Category not found");
                    }

                    FakeDatabase.Categories.Remove(category);

                    _logger.LogInformation($"Proccessing of request successful");
                    return NoContent();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(DeleteCategory)}");
                    return StatusCode(500, "Internal Server Error. Please Try Again Later.");
                }

            }
        }


        [HttpPut("{id}")]
        public ActionResult<CategoryDTO> UpdateCategory(Guid id, [FromBody] CreateCategoryDTO categoryDTO)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var existingCategory = FakeDatabase.Categories.FirstOrDefault(c => c.Id == id);
                    if (existingCategory == null)
                    {
                        _logger.LogError($"Invalid attempt in {nameof(UpdateCategory)}, No record with Id : {id}");
                        return BadRequest("Category not found.");
                    }

                    var newCategory = _mapper.Map<CategoryModel>(categoryDTO);

                    if (FakeDatabase.Categories.Any(c => c.Id != id && c.Name == newCategory.Name))
                    {
                        _logger.LogError($"Invalid attempt in {nameof(UpdateCategory)}, Already Existing Record with Id : {id}");
                        return BadRequest("Category name already exists.");
                    }

                    existingCategory.Name = newCategory.Name;
                    var updatedCategoryDTO = _mapper.Map<CategoryDTO>(existingCategory);

                    _logger.LogInformation($"Proccessing of request successful");
                    return Ok(updatedCategoryDTO);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(CreateCategory)}");
                    return StatusCode(500, "Internal Server Error. Please Try Again Later.");
                }
            }
        }
    }
}
