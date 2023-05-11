using AutoMapper;
using Eshop.webAPI.DTO;
using Eshop.webAPI.FakeDB;
using Eshop.webAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly ILogger<ReviewController> _logger;
        private readonly IMapper _mapper;
        

        public ReviewController(ILogger<ReviewController> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            
        }

        [HttpGet("byCommodityId/{id}")]
        public ActionResult<List<ReviewDTO>> GetReviewByCommodityId(Guid id)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var commodity = FakeDatabase.Commodities.FirstOrDefault(c => c.Id == id);

                    if (commodity != null)
                    {
                        var reviews = commodity.Reviews;
                        var result = _mapper.Map<List<ReviewDTO>>(reviews);

                        _logger.LogInformation($"Proccessing of request successful");
                        return Ok(result);
                    }
                    else
                    {
                        _logger.LogWarning($"Commodity with ID {id} not found");
                        return NotFound();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(GetReviewByCommodityId)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }
        }

        [HttpGet("byId/{id}", Name = "GetReview")]
        public ActionResult<ReviewDTO> GetReview(Guid id)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var review = FakeDatabase.Reviews.FirstOrDefault(r => r.Id == id);

                    if (review != null)
                    {
                        var result = _mapper.Map<ReviewDTO>(review);

                        _logger.LogInformation($"Proccessing of request successful");
                        return Ok(result);
                    }
                    else
                    {
                        _logger.LogWarning($"Review with ID {id} not found");
                        return NotFound();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(GetReview)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }
        }

        [HttpGet("byName/{name}")]
        public ActionResult<ReviewDTO> GetReviewByName(string name)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var review = FakeDatabase.Reviews.FirstOrDefault(r => r.Title == name);

                    if (review != null)
                    {
                        var result = _mapper.Map<ReviewDTO>(review);

                        _logger.LogInformation($"Proccessing of request successful");
                        return Ok(result);
                    }
                    else
                    {
                        _logger.LogWarning($"Review with title {name} not found");
                        return NotFound();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error {nameof(GetReviewByName)}");
                    return StatusCode(500, "Internal Server Error. Please Try Again Later.");
                }
            }
        }

        [HttpPost]
        public ActionResult<ReviewDTO> CreateReview(Guid id, [FromBody] CreateReviewDTO reviewDTO)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var commodity = FakeDatabase.Commodities.FirstOrDefault(c => c.Id == id);
                    if (FakeDatabase.Reviews.Any(r => r.Title == reviewDTO.Title))
                    {
                        _logger.LogWarning($"Review with title {reviewDTO.Title} already exists");
                        return Conflict();
                    }
                    if (commodity != null)
                    {
                        var review = _mapper.Map<ReviewModel>(reviewDTO);

                        commodity.addReview(review);
                        FakeDatabase.Reviews.Add(review);

                        var result = _mapper.Map<ReviewDTO>(review);

                        _logger.LogInformation($"Proccessing of request successful");
                        return CreatedAtRoute(nameof(GetReview), new { id = result.Id }, result);
                    }
                    else
                    {
                        _logger.LogError($"Commodity with {id} not found in {nameof(CreateReview)}");
                        return NotFound("Commodity not found");
                    }

                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(CreateReview)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<ReviewDTO> DeleteReview(Guid id)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var review = FakeDatabase.Reviews.FirstOrDefault(r => r.Id == id);

                    if (review == null)
                    {
                        _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteReview)}, No record with Id : {id}");
                        return NotFound();
                    }

                    FakeDatabase.Reviews.Remove(review);

                    _logger.LogInformation($"Proccessing of request successful");
                    return NoContent();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(DeleteReview)}");
                    return StatusCode(500, "Internal Server Error. Please try again later.");
                }
            }
        }

        [HttpPut("{id}")]
        public ActionResult<ReviewDTO> UpdateReview(Guid id, [FromBody] CreateReviewDTO reviewDTO)
        {
            var requestUrl = HttpContext.Request.Path;
            var method = HttpContext.Request.Method;

            using (var scope = _logger.BeginScope($"{method} : Processing request from {requestUrl}"))
            {
                try
                {
                    var existingReview = FakeDatabase.Reviews.FirstOrDefault(r => r.Id == id);
                    if (existingReview == null)
                    {
                        _logger.LogError($"Invalid attempt in {nameof(UpdateReview)}, No record with Id : {id}");
                        return BadRequest("Review not found.");
                    }

                    var newReview = _mapper.Map<ReviewModel>(reviewDTO);

                    if (FakeDatabase.Reviews.Any(r => r.Id != id && r.Title == newReview.Title))
                    {
                        _logger.LogError($"Invalid attempt in {nameof(UpdateReview)}, Already Existing Record with Id : {id}");
                        return BadRequest("Review name already exists.");
                    }

                    existingReview.Title = newReview.Title;
                    existingReview.Stars = newReview.Stars;
                    existingReview.Description = newReview.Description;

                    var updatedReviewDTO = _mapper.Map<ReviewModel>(reviewDTO);

                    _logger.LogInformation($"Proccessing of request successful");
                    return Ok(updatedReviewDTO);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error in {nameof(UpdateReview)}");
                    return StatusCode(500, "Internal Server Error. Please Try Again Later.");
                }
            }
        }
    }
}
