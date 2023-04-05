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
        public IActionResult GetReviewByCommodityId(Guid id)
        {
            try
            {
                var commodity = FakeDatabase.Commodities.FirstOrDefault(c => c.Id == id);

                if (commodity != null)
                {
                    var reviews = commodity.Reviews;
                    var result = _mapper.Map<List<ReviewDTO>>(reviews);
                    return Ok(result);
                }
                else
                {
                    _logger.LogWarning($"Commodity with ID '{id}' not found");
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in {nameof(GetReviewByCommodityId)}");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }

        [HttpGet("byId/{id}")]
        public IActionResult GetReviewById(Guid id)
        {
            try
            {
                var review = FakeDatabase.Reviews.FirstOrDefault(r => r.Id == id);

                if (review != null)
                {
                    var result = _mapper.Map<ReviewDTO>(review);
                    return Ok(result);
                }
                else
                {
                    _logger.LogWarning($"Review with ID '{id}' not found");
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in {nameof(GetReviewById)}");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }

        [HttpGet("byName/{name}")]
        public IActionResult GetReviewByName(string name)
        {
            try
            {
                var review = FakeDatabase.Reviews.FirstOrDefault(r => r.Title == name);

                if (review != null)
                {
                    var result = _mapper.Map<ReviewDTO>(review);
                    return Ok(result);
                }
                else
                {
                    _logger.LogWarning($"Review with title '{name}' not found");
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in {nameof(GetReviewByName)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }

        [HttpPost]
        public IActionResult CreateReview([FromBody] CreateReviewDTO reviewDTO)
        {
            try
            {
                if (FakeDatabase.Reviews.Any(r => r.Title == reviewDTO.Title))
                {
                    _logger.LogWarning($"Review with title '{reviewDTO.Title}' already exists");
                    return Conflict();
                }

                var review = _mapper.Map<ReviewModel>(reviewDTO);
                FakeDatabase.AddReview(review);

                var result = _mapper.Map<ReviewDTO>(review);
                return CreatedAtRoute("GetReviewById", new { id = result.Id }, result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong in {nameof(CreateReview)}");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteReview(Guid id)
        {
            try
            {
                var review = FakeDatabase.Reviews.FirstOrDefault(r => r.Id == id);

                if (review == null)
                {
                    _logger.LogWarning($"Could not find review with id '{id}'");
                    return NotFound();
                }

                FakeDatabase.Reviews.Remove(review);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong while deleting review with id '{id}'");
                return StatusCode(500, "Internal Server Error. Please try again later.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateReview(Guid id, [FromBody] CreateReviewDTO reviewDTO)
        {
            try
            {
                var existingReview = FakeDatabase.Reviews.FirstOrDefault(r => r.Id == id);
                if (existingReview == null)
                {
                    _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateReview)})");
                    return BadRequest("Review not found.");
                }

                var newReview = _mapper.Map<ReviewModel>(reviewDTO);
                if (FakeDatabase.Reviews.Any(r => r.Id != id && r.Title == newReview.Title))
                {
                    _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateReview)})");
                    return BadRequest("Review name already exists.");
                }

                newReview.Title = newReview.Title;
                var updatedReviewDTO = _mapper.Map<ReviewModel>(reviewDTO);
                return Ok(updatedReviewDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something Went Wrong in the {nameof(UpdateReview)}");
                return StatusCode(500, "Internal Server Error. Please Try Again Later.");
            }
        }


    }
}
