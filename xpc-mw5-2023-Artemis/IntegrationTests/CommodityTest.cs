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

public class CommodityTest
{
    public class CommodityTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;
        private readonly Faker _faker;

        public CommodityTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
            _faker = new Faker();
        }

        [Fact]
        public async Task GetCommodities()
        {
            var response = await _client.GetAsync("/api/Commodity");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var commodities = JsonConvert.DeserializeObject<List<CommodityDTO>>(content);

                Assert.NotNull(commodities);
                Assert.NotEmpty(commodities);
                Assert.All(commodities, commodity =>
                {
                    Assert.NotNull(commodity.Name);
                    Assert.True(!string.IsNullOrEmpty(commodity.Name), "Commodity Name should not be null or empty");
                    Assert.True(commodity.Name.Length <= 255, "Commodity Name exceeds maximum length");
                    Assert.InRange(commodity.AverageRating, 0, 5);
         
                });

            }
            else
            {
                Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            }
        }
        [Fact]
        public async Task GetCommodityByName()
        {
            var commodityName = _faker.Commerce.ProductName();

            var response = await _client.GetAsync($"/api/Commodity/byName/{commodityName}");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var commodity = JsonConvert.DeserializeObject<CommodityDTO>(content);

                Assert.NotNull(commodity);
                Assert.Equal(commodityName, commodity.Name);
                Assert.InRange(commodity.AverageRating, 0, 5);
                Assert.NotNull(commodity.ImageUrl);
                Assert.NotNull(commodity.Description);
                Assert.NotNull(commodity.Price);
                Assert.NotNull(commodity.Weight);
                Assert.InRange(commodity.StockQuantity, 0, int.MaxValue);
                Assert.NotEqual(Guid.Empty, commodity.CategoryId);
                Assert.NotEqual(Guid.Empty, commodity.ManufacturerId);
            }
            else
            {
                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            }
        }



        [Fact]
        public async Task GetCommodityById()
        {
            var commodityId = Guid.NewGuid();

            var response = await _client.GetAsync($"/api/Commodity/byId/{commodityId}");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var commodity = JsonConvert.DeserializeObject<CommodityDTO>(content);

                Assert.NotNull(commodity);
                Assert.Equal(commodityId, commodity.Id);
                Assert.NotNull(commodity.Name);
                Assert.True(!string.IsNullOrEmpty(commodity.Name), "Commodity Name should not be null or empty");
                Assert.True(commodity.Name.Length <= 255, "Commodity Name exceeds maximum length");
                Assert.InRange(commodity.AverageRating, 0, 5);
                Assert.NotNull(commodity.ImageUrl);
                Assert.NotNull(commodity.Description);
                Assert.NotNull(commodity.Price);
                Assert.NotNull(commodity.Weight);
                Assert.InRange(commodity.StockQuantity, 0, int.MaxValue);
                Assert.NotEqual(Guid.Empty, commodity.CategoryId);
                Assert.NotEqual(Guid.Empty, commodity.ManufacturerId);
            }
            else
            {
                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            }

        }

        [Fact]
        public async Task CreateCommodity()
        {
            var commodityDto = new CreateCommodityDTO
            {
                Name = _faker.Commerce.Product()
            };

            var json = JsonConvert.SerializeObject(commodityDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _client.PostAsync("/api/Commodity", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var createdCommodity = JsonConvert.DeserializeObject<CommodityDTO>(responseContent);

                Assert.NotNull(createdCommodity);
                Assert.True(!string.IsNullOrEmpty(createdCommodity.Name), "Commodity Name should not be null or empty");
                Assert.True(createdCommodity.Name.Length <= 255, "Commodity Name exceeds maximum length");
                Assert.Equal(commodityDto.ImageUrl, createdCommodity.ImageUrl);
                Assert.Equal(commodityDto.Description, createdCommodity.Description);
                Assert.Equal(commodityDto.Price, createdCommodity.Price);
                Assert.Equal(commodityDto.Weight, createdCommodity.Weight);
                Assert.Equal(commodityDto.StockQuantity, createdCommodity.StockQuantity);
                Assert.Equal(commodityDto.CategoryId, createdCommodity.CategoryId);
                Assert.Equal(commodityDto.ManufacturerId, createdCommodity.ManufacturerId);
            }
            else
            {
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            }

        }

        [Fact]
        public async Task DeleteCommodity()
        {
            var commodityId = Guid.NewGuid();

            var response = await _client.DeleteAsync($"/api/Commodity/{commodityId}");

            if (response.IsSuccessStatusCode)
            {
                
            }
            else
            {

                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            }
        }
        [Fact]
        public async Task UpdateCommodity()
        {
            var commodityId = Guid.NewGuid();

            var faker = new Faker();
            var commodityDto = new CommodityDTO
            {
                Id = commodityId,
                Name = faker.Commerce.Product(),
                ImageUrl = faker.Internet.Url(),
                Description = faker.Lorem.Sentence(),
                Price = faker.Random.Float(1, 1000),
                Weight = faker.Random.Float(0.1f, 10f),
                StockQuantity = faker.Random.Int(0, 100),
                CategoryId = Guid.NewGuid(),
                ManufacturerId = Guid.NewGuid()
            };

            var json = JsonConvert.SerializeObject(commodityDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _client.PutAsync($"/api/Commodity/{commodityId}", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var updatedCommodity = JsonConvert.DeserializeObject<CommodityDTO>(responseContent);

                Assert.NotNull(updatedCommodity);
                Assert.Equal(commodityId, updatedCommodity.Id);
                Assert.Equal(commodityDto.Name, updatedCommodity.Name);
                Assert.Equal(commodityDto.ImageUrl, updatedCommodity.ImageUrl);
                Assert.Equal(commodityDto.Description, updatedCommodity.Description);
                Assert.Equal(commodityDto.Price, updatedCommodity.Price);
                Assert.Equal(commodityDto.Weight, updatedCommodity.Weight);
                Assert.Equal(commodityDto.StockQuantity, updatedCommodity.StockQuantity);
                Assert.Equal(commodityDto.CategoryId, updatedCommodity.CategoryId);
                Assert.Equal(commodityDto.ManufacturerId, updatedCommodity.ManufacturerId);
            }
            else
            {
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            }
        }


    }
}




