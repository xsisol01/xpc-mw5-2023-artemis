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

namespace IntegrationTests
{
    public class ManufacturerTest
    {
        public class ManufacturerTests : IClassFixture<WebApplicationFactory<Program>>
        {
            private readonly HttpClient _client;
            private readonly Faker _faker;

            public ManufacturerTests (WebApplicationFactory<Program> factory)
            {
                _client = factory.CreateClient();
                _faker = new Faker();
            }


            [Fact]
            public async Task GetManufacturers()
            {
                var response = await _client.GetAsync("/api/Manufacturer");
                var content = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var manufacturers = JsonConvert.DeserializeObject<List<ManufacturerDTO>>(content);
                    Assert.NotNull(manufacturers);
                    Assert.NotEmpty(manufacturers);
                    Assert.All(manufacturers, manufacturer =>
                    {
                        Assert.NotNull(manufacturer.Name);
                        Assert.True(!string.IsNullOrEmpty(manufacturer.Name), "Manufacturer Name should not be null or empty");
                        Assert.True(manufacturer.Name.Length <= 255, "Manufacturer Name exceeds maximum length");
                       
                        Assert.NotNull(manufacturer.ImageUrl);
                        Assert.NotNull(manufacturer.Description);
                        Assert.NotNull(manufacturer.Country);
                    });

                }
                else
                {
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                }
            }

            [Fact]
            public async Task GetManufacturerById()
            {
                // Arrange
                var manufacturerId = Guid.NewGuid();

                // Act
                var response = await _client.GetAsync($"/api/Manufacturer/byId/{manufacturerId}");
                var content = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var manufacturer = JsonConvert.DeserializeObject<ManufacturerDTO>(content);

                    // Assert
                    Assert.NotNull(manufacturer);
                    Assert.Equal(manufacturerId, manufacturer.Id);
                    Assert.NotNull(manufacturer.Name);
                    Assert.NotNull(manufacturer.ImageUrl);
                    Assert.NotNull(manufacturer.Description);
                    Assert.NotNull(manufacturer.Country);
                    
                }
                else
                {
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                }
            }


            [Fact]
            public async Task GetManufacturersCommodities()
            {
                // Arrange
                var manufacturerId = Guid.NewGuid();

                // Act
                var response = await _client.GetAsync($"/api/Manufacturer/getCommodities/{manufacturerId}");
                var content = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var commodities = JsonConvert.DeserializeObject<List<CommodityDTO>>(content);

                    // Assert
                    Assert.NotNull(commodities);
                    Assert.NotEmpty(commodities);
                    Assert.All(commodities, commodity =>
                    {
                        Assert.NotNull(commodity.Name);
                        Assert.True(!string.IsNullOrEmpty(commodity.Name), "Commodity Name should not be null or empty");
                        Assert.True(commodity.Name.Length <= 255, "Commodity Name exceeds maximum length");

                        Assert.InRange(commodity.AverageRating, 0, 5);
                        Assert.NotNull(commodity.ImageUrl);
                        Assert.NotNull(commodity.Description);
                        Assert.NotNull(commodity.Price);
                        Assert.NotNull(commodity.Weight);
                        Assert.InRange(commodity.StockQuantity, 0, int.MaxValue);
                        Assert.Equal(manufacturerId, commodity.ManufacturerId);
                    });
                }
                else
                {
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                }
            }



            [Fact]
            public async Task GetManufacturerByName()
            {
                var manufacturerName = _faker.Company.CompanyName();

                var response = await _client.GetAsync($"/api/Manufacturer/byName/{manufacturerName}");
                var content = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var manufacturer = JsonConvert.DeserializeObject<ManufacturerDTO>(content);

                    Assert.NotNull(manufacturer);
                    Assert.Equal(manufacturerName, manufacturer.Name);
                    Assert.NotNull(manufacturer.ImageUrl);
                    Assert.NotNull(manufacturer.Description);
                    Assert.NotNull(manufacturer.Country);
                }
                else
                {
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                }
            }


            [Fact]
            public async Task CreateManufacturer()
            {
                var manufacturerDto = new CreateManufacturerDTO
                {
                    Name = _faker.Company.CompanyName(),
                    Country = _faker.Address.Country(),
                    Description = _faker.Lorem.Sentence(),
                    ImageUrl = _faker.Internet.Url()
                };

                var json = JsonConvert.SerializeObject(manufacturerDto);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _client.PostAsync("/api/Manufacturer", content);
                var responseContent = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var createdManufacturer = JsonConvert.DeserializeObject<ManufacturerDTO>(responseContent);

                    Assert.NotNull(createdManufacturer);
                    Assert.Equal(manufacturerDto.Name, createdManufacturer.Name);
                    Assert.Equal(manufacturerDto.Country, createdManufacturer.Country);
                    Assert.Equal(manufacturerDto.Description, createdManufacturer.Description);
                    Assert.Equal(manufacturerDto.ImageUrl, createdManufacturer.ImageUrl);
                }
                else
                {
                    Assert.Equal(HttpStatusCode.Conflict, response.StatusCode);
                }
            }

            [Fact]
            public async Task DeleteManufacturer()
            {
               
                var manufacturerId = Guid.NewGuid();

                
                var response = await _client.DeleteAsync($"/api/Manufacturer/{manufacturerId}");

               
                if (response.IsSuccessStatusCode)
                {
                    
                }
                else
                {
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                }
            }
            [Fact]
            public async Task UpdateManufacturer()
            {
                
                var manufacturerId = Guid.NewGuid();

                var faker = new Faker();
                var updatedManufacturerDto = new CreateManufacturerDTO
                {
                    Name = faker.Company.CompanyName(),
                    Country = faker.Address.Country(),
                    Description = faker.Lorem.Sentence(),
                    ImageUrl = faker.Image.PicsumUrl()
                };
                var json = JsonConvert.SerializeObject(updatedManufacturerDto);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _client.PutAsync($"/api/Manufacturer/{manufacturerId}", content);
                var responseContent = await response.Content.ReadAsStringAsync();

               
                if (response.IsSuccessStatusCode)
                {
                    var updatedManufacturer = JsonConvert.DeserializeObject<ManufacturerDTO>(responseContent);

                    Assert.NotNull(updatedManufacturer);
                    Assert.Equal(updatedManufacturerDto.Name, updatedManufacturer.Name);
                    Assert.Equal(updatedManufacturerDto.Country, updatedManufacturer.Country);
                    Assert.Equal(updatedManufacturerDto.Description, updatedManufacturer.Description);
                    Assert.Equal(updatedManufacturerDto.ImageUrl, updatedManufacturer.ImageUrl);
                }
                else if (response.StatusCode == HttpStatusCode.BadRequest)
                {
                  
                    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                 
                }
                else
                {
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                }
            }


        }
    }
}


