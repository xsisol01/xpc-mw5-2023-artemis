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

public class IntegrationTest
{
    public class IntegrationTest1 : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;
        private readonly Faker _faker;

        public IntegrationTest1(WebApplicationFactory<Startup> factory, Faker faker)
        {
            _client = factory.CreateClient();
            _faker = faker;
        }

        [Fact]
        public async Task GetCategories()
        {
            // Arrange

            // Act
            var response = await _client.GetAsync("/api/Category");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var categories = JsonConvert.DeserializeObject<List<CategoryDTO>>(content);

                // Assert
                Assert.NotNull(categories);
                Assert.NotEmpty(categories);
                Assert.All(categories, category =>
                {
                    Assert.NotNull(category.Name);
                    Assert.True(!string.IsNullOrEmpty(category.Name), "Category Name should not be null or empty");
                    Assert.True(category.Name.Length <= 255, "Category Name exceeds maximum length");
                });
                // Add more assertions for other properties if needed
            }
            else
            {
                // Handle the case when the response is not successful
                // For example, assert that the response status code is 404 (Not Found)
                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            }
            // Add more assertions as per your requirements
        }


        [Fact]
        public async Task GetCategoryById()
        {
            // Arrange
            var categoryId = Guid.NewGuid();

            // Act
            var response = await _client.GetAsync($"/api/Category/byId/{categoryId}");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var category = JsonConvert.DeserializeObject<CategoryDTO>(content);

                // Assert
                Assert.NotNull(category);
                Assert.Equal(categoryId, category.Id);
                Assert.NotNull(category.Name);
                Assert.True(!string.IsNullOrEmpty(category.Name), "Category Name should not be null or empty");
                Assert.True(category.Name.Length <= 255, "Category Name exceeds maximum length");
                // Add more assertions for other properties if needed
            }
            else
            {
                // Handle the case when the response is not successful
                // For example, assert that the response status code is 404 (Not Found)
                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            }
            // Add more assertions as per your requirements
        }

        [Fact]
        public async Task CreateCategory()
        {
            // Arrange
            var categoryDto = new CreateCategoryDTO
            {
                Name = _faker.Commerce.Product()
                // Set other properties for the new category if needed
            };
            var json = JsonConvert.SerializeObject(categoryDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PostAsync("/api/Category", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var createdCategory = JsonConvert.DeserializeObject<CategoryDTO>(responseContent);

                // Assert
                Assert.NotNull(createdCategory);
                Assert.Equal("New Category", createdCategory.Name);
                // Add more assertions for other properties if needed
            }
            else
            {
                // Handle the case when the response is not successful
                // For example, assert that the response status code is 400 (Bad Request)
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            }
            // Add more assertions as per your requirements
        }

        [Fact]
        public async Task DeleteCategory()
        {
            // Arrange
            var categoryId = Guid.NewGuid();

            // Act
            var response = await _client.DeleteAsync($"/api/Category/{categoryId}");

            // Assert
            if (response.IsSuccessStatusCode)
            {
                // The delete operation was successful, so no further assertions are needed
            }
            else
            {
                // Handle the case when the response is not successful
                // For example, assert that the response status code is 404 (Not Found)
                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            }
        }

        [Fact]
        public async Task UpdateCategory()
        {
            // Arrange
            var categoryId = Guid.NewGuid();
            var categoryDto = new CreateCategoryDTO
            {
                Name = "Updated Category" // Provide the updated name

            };
            var json = JsonConvert.SerializeObject(categoryDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PutAsync($"/api/Category/{categoryId}", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var updatedCategory = JsonConvert.DeserializeObject<CategoryDTO>(responseContent);

                // Assert
                Assert.NotNull(updatedCategory);
                Assert.Equal("Updated Category", updatedCategory.Name);
                // Add assertions for other properties if needed
            }
            else
            {
                // Handle the case when the response is not successful
                // For example, assert that the response status code is 400 (Bad Request)
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            }
           
        }

    }
}
    

    
    
