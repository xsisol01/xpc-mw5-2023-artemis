using Eshop.webAPI.DTO;
using Eshop.webAPI.FakeDB;
using Eshop.webAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        [HttpGet("GetCategories")]
        public IEnumerable<CategoryOutputDto> GetCategories()
        {
            return FakeDatabase.Categories;
        }

        //[HttpGet("{id}")]
        //public Category GetCategorytById(Guid id)
        //{
        //    var category = (from c in FakeDatabase.Categories
        //                    where c.Id == id
        //                    select c).FirstOrDefault();
        //    //Handler if zero TODO
        //    return category;
        //}

        [HttpGet("{name}")]
        public CategoryDTO GetCategorytByName(string name)
        {
            var category = (from c in FakeDatabase.Categories
                            where c.Name == name
                            select c).FirstOrDefault();
            //Handler if zero TODO
            return category;
        }

        [HttpPost]
        public IActionResult Create(CreateCategoryDTO newCategory)
        {
            // Validate model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            FakeDatabase
                .AddCategory(
                    new Category()
                    {
                        Name = newCategory.Name,
                        Id = new Guid()
                    }
                ) ;

            // Return success response
            return Ok();
        }
    }
}
