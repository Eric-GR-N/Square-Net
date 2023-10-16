using IdentityServer4.Extensions;
using Infrastructure.Entities;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class SquareNetController : ControllerBase
    {
        private readonly ISquareNetRepository _squareNetRepository;
        public SquareNetController(ISquareNetRepository squareNetRepository)
        {
            _squareNetRepository = squareNetRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SquareNet>> GetSquareNetAsync(Guid id)
        {
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<SquareNet>> AddNewSquareNetAsync()
        {

            try
            {
                var userId = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest("No user id");
                }

                if (Guid.TryParse(userId, out var id))
                {
                    var squares = Enumerable.Range(1, 25).Select(_ => new Square()).ToList();

                    var squareNet = new SquareNet
                    {
                        ApplicationUserId = Guid.Parse(userId),
                        Squares = squares,
                    };

                    await _squareNetRepository.CreateSquareNetAsync(squareNet);

                    return CreatedAtAction(nameof(GetSquareNetAsync), new { id = squareNet.Id }, squareNet);
                }
                else
                {
                    return BadRequest("Invalid user id format");
                }
            }
            catch (Exception)
            {
                return BadRequest("Something went wrong");
            }
        }
    }
}
