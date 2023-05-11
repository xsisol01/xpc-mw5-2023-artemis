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
    public class ReviewTest
    {
        public class ReviewTests : IClassFixture<WebApplicationFactory<Program>>
        {
            private readonly HttpClient _client;
            private readonly Faker _faker;

            public ReviewTests(WebApplicationFactory<Program> factory)
            {
                _client = factory.CreateClient();
                _faker = new Faker();
            }


            [Fact]
            public async Task GetReviewsByCommodityId()
            {
                var commodityId = Guid.NewGuid();

                var response = await _client.GetAsync($"/api/Review/byCommodityId/{commodityId}");
                var content = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var reviews = JsonConvert.DeserializeObject<List<ReviewDTO>>(content);

                    Assert.NotNull(reviews);
                    Assert.NotEmpty(reviews);
                    Assert.All(reviews, review =>
                    {
                        Assert.NotNull(review.Title);
                        Assert.NotNull(review.Description);
                        Assert.True(review.Stars > 0, "Stars should be greater than zero");
                    });
                }
                else
                {
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                }
            }

            [Fact]
            public async Task GetReviewById()
            {
                var reviewId = Guid.NewGuid();

                var response = await _client.GetAsync($"/api/Review/byId/{reviewId}");
                var content = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var review = JsonConvert.DeserializeObject<ReviewDTO>(content);

                    Assert.NotNull(review);
                    Assert.Equal(reviewId, review.Id);
                    Assert.NotNull(review.Title);
                    Assert.NotNull(review.Description);
                    Assert.True(review.Stars > 0, "Stars should be greater than zero");
                }
                else
                {
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                }
            }

            [Fact]
            public async Task GetReviewByName()
            {
                var reviewName = _faker.Lorem.Word();

                var response = await _client.GetAsync($"/api/Review/byName/{reviewName}");
                var content = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var review = JsonConvert.DeserializeObject<ReviewDTO>(content);

                    Assert.NotNull(review);
                    Assert.NotNull(review.Title);
                    Assert.NotNull(review.Description);
                    Assert.True(review.Stars > 0, "Stars should be greater than zero");
                }
                else
                {
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                }
            }


            [Fact]
            public async Task CreateReview()
            {
                var reviewDto = new CreateReviewDTO
                {
                    Title = _faker.Lorem.Word(),
                    Description = _faker.Lorem.Paragraph(),
                    Stars = _faker.Random.Int(1, 5),
                };
                var json = JsonConvert.SerializeObject(reviewDto);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _client.PostAsync("/api/Review", content);
                var responseContent = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var createdReview = JsonConvert.DeserializeObject<ReviewDTO>(responseContent);

                    Assert.NotNull(createdReview);
                    Assert.Equal(reviewDto.Title, createdReview.Title);
                    Assert.Equal(reviewDto.Description, createdReview.Description);
                    Assert.Equal(reviewDto.Stars, createdReview.Stars);
                }
                else
                {
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                }
            }



            [Fact]
            public async Task DeleteReview()
            {
                var reviewId = Guid.NewGuid();

                var response = await _client.DeleteAsync($"/api/Review/{reviewId}");

                if (response.IsSuccessStatusCode)
                {
                    
                }
                else
                {
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                }
            }

            [Fact]
            public async Task UpdateReview()
            {
                var reviewId = Guid.NewGuid();
                var reviewDto = new ReviewDTO
                {
                    Title = _faker.Lorem.Word(),
                    Description = _faker.Lorem.Paragraph(),
                    Stars = _faker.Random.Int(1, 5),
                };
                var json = JsonConvert.SerializeObject(reviewDto);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _client.PutAsync($"/api/Review/{reviewId}", content);
                var responseContent = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var updatedReview = JsonConvert.DeserializeObject<ReviewDTO>(responseContent);

                    Assert.NotNull(updatedReview);
                    Assert.Equal(reviewDto.Title, updatedReview.Title);
                    Assert.Equal(reviewDto.Description, updatedReview.Description);
                    Assert.Equal(reviewDto.Stars, updatedReview.Stars);
                }
                else
                {
                    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                }
            }
        }
    }
}


