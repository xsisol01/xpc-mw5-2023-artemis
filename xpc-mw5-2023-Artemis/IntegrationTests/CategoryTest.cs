using Eshop.webAPI.DTO;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Bogus;
using Bogus.DataSets;

namespace IntegrationTests;

public class CategoryTest
{
    public class CategoryTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;
        private readonly Faker _faker;

        public CategoryTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
            _faker = new Faker();
        }


        [Fact]
        public async Task GetCategories()
        {
        
            var response = await _client.GetAsync("/api/Category");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var categories = JsonConvert.DeserializeObject<List<CategoryDTO>>(content);

                Assert.NotNull(categories);
                Assert.NotEmpty(categories);
                Assert.All(categories, category =>
                {
                    Assert.NotNull(category.Name);
                    Assert.True(!string.IsNullOrEmpty(category.Name), "Category Name should not be null or empty");
                    Assert.True(category.Name.Length <= 255, "Category Name exceeds maximum length");
                });
               
            }
            else
            {

                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            }

        }
        [Fact]
        public async Task GetCategoryByName()
        {

            var categoryName = _faker.Commerce.Department();

            var response = await _client.GetAsync($"/api/Category/byName/{categoryName}");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var category = JsonConvert.DeserializeObject<CategoryDTO>(content);

                Assert.NotNull(category);
                Assert.Equal(categoryName, category.Name);
                Assert.NotNull(category.Name);
                Assert.True(!string.IsNullOrEmpty(category.Name), "Category Name should not be null or empty");
                Assert.True(category.Name.Length <= 255, "Category Name exceeds maximum length");
            }
            else
            {
                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            }
        }




        [Fact]
        public async Task GetCategoryById()
        {
            var categoryId = Guid.NewGuid();

            var response = await _client.GetAsync($"/api/Category/byId/{categoryId}");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var category = JsonConvert.DeserializeObject<CategoryDTO>(content);

                Assert.NotNull(category);
                Assert.Equal(categoryId, category.Id);
                Assert.NotNull(category.Name);
                Assert.True(!string.IsNullOrEmpty(category.Name), "Category Name should not be null or empty");
                Assert.True(category.Name.Length <= 255, "Category Name exceeds maximum length");
            
            }
            else
            {
                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            }
         
        }

        [Fact]
        public async Task CreateCategory()
        {
            var categoryDto = new CreateCategoryDTO
            {
                Name = _faker.Commerce.Product()
            };
            var json = JsonConvert.SerializeObject(categoryDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _client.PostAsync("/api/Category", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var createdCategory = JsonConvert.DeserializeObject<CategoryDTO>(responseContent);

                Assert.NotNull(createdCategory);
                Assert.True(!string.IsNullOrEmpty(createdCategory.Name), "Category Name should not be null or empty");
                Assert.True(createdCategory.Name.Length <= 255, "Category Name exceeds maximum length");
            }
            else if (response.StatusCode == HttpStatusCode.Conflict)
            {
                Assert.Equal(HttpStatusCode.Conflict, response.StatusCode);
            }
            else
            {
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            }
        }


        [Fact]
        public async Task DeleteCategory()
        {
            var categoryId = Guid.NewGuid();

            var response = await _client.DeleteAsync($"/api/Category/{categoryId}");

            if (response.IsSuccessStatusCode)
            {

            }
            else
            {
             
                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            }
        }

        [Fact]
        public async Task UpdateCategory()
        {
            var categoryId = Guid.NewGuid();
            var categoryDto = new CreateCategoryDTO
            {
                Name = _faker.Commerce.Product()
            };
            var json = JsonConvert.SerializeObject(categoryDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _client.PutAsync($"/api/Category/{categoryId}", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var updatedCategory = JsonConvert.DeserializeObject<CategoryDTO>(responseContent);

                Assert.NotNull(updatedCategory);
                Assert.Equal(categoryDto.Name, updatedCategory.Name);
            }
            else
            {
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            }
        }


    }
}
    

    
    
