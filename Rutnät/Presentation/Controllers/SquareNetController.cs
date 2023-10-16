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

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<SquareNet>> GetSquareNetAsync(Guid id)
        {
            var squareNet = await _squareNetRepository.GetSquareNetByIdAsync(id);

            if(squareNet == null)
            {
                return NotFound();
            }

            return Ok(squareNet);
        }

        [HttpGet("getAllSquareNetsForUser")]
        public async Task<ActionResult<List<SquareNet>>> GetAllSquareNetForUserAsync()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("No user id");
            }

            if (Guid.TryParse(userId, out var id))
            {
                var squareNets = await _squareNetRepository.GetSquareNetsByUserIdAsync(id);

                return Ok(squareNets);
            }
            else
            {
                return BadRequest("Invalid user id format");
            }
        }

        [HttpPost]
        public async Task<ActionResult<SquareNet>> AddNewSquareNetAsync([FromBody] string name)
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
                        Name = name,
                        ApplicationUserId = id,
                        Squares = squares,
                    };

                    await _squareNetRepository.CreateSquareNetAsync(squareNet);

                    return Ok(squareNet);
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
