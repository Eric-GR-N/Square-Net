using Application.Exceptions;
using AutoMapper;
using Domain.Dtos;
using Infrastructure.Entities;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Presentation.RequestModels;
using Presentation.ResponseModels;

namespace Presentation.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class SquareNetController : ControllerBase
    {
        private readonly ISquareNetRepository _squareNetRepository;
        private readonly IMapper _mapper;
        public SquareNetController(ISquareNetRepository squareNetRepository, IMapper mapper)
        {
            _squareNetRepository = squareNetRepository;
            _mapper = mapper;
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

        [HttpGet("squareNets/{userId}")]
        public async Task<ActionResult<List<SquareNetResponseModel>>> GetAllSquareNetsForUserAsync(string userId)
        {
            if (Guid.TryParse(userId, out var id))
            {
                var squareNets = await _squareNetRepository.GetSquareNetsByUserIdAsync(id);
                var response = squareNets.Select(_ => _mapper.Map<SquareNetResponseModel>(_)).ToList();

                return Ok(response);
            }
            else
            {
                return BadRequest("Invalid user id format");
            }
        }

        [HttpPost]
        public async Task<ActionResult<SquareNetResponseModel>> AddNewSquareNetAsync([FromBody] string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("No name provided");
            }

            try
            {
                var existingSquareNet = await _squareNetRepository.GetSquareNetByNameAsync(name);

                if(existingSquareNet != null)
                {
                    return BadRequest("A square net with that name already exists");
                }

                var userId = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;

                if (Guid.TryParse(userId, out var id))
                {
                    var squareDtos = Enumerable.Range(1, 25).Select(_ => new SquareDto()).ToList();

                    var squareNetDto = new SquareNetDto
                    {
                        Name = name,
                        ApplicationUserId = id,
                        Squares = squareDtos,
                    };

                    var newEntity = await _squareNetRepository.CreateSquareNetAsync(_mapper.Map<SquareNet>(squareNetDto));

                    var response = _mapper.Map<SquareNetResponseModel>(newEntity);

                    return Ok(response);
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

        [HttpPut]
        public async Task<ActionResult<SquareNetResponseModel>> UpdateSquareNetAsync([FromBody] SquareNetRequestModel squareNet)
        {
            if (string.IsNullOrEmpty(squareNet.Name))
            {
                return BadRequest("No name provided");
            }

            try
            {
                var existingSquareNet = await _squareNetRepository.CheckDuplicateNamesAsync(squareNet.Name, squareNet.Id);

                if (existingSquareNet)
                {
                    return BadRequest("A square net with that name already exists");
                }

                var squareNetEntity = _mapper.Map<SquareNet>(squareNet);
                await _squareNetRepository.UpdateSquareNetAsync(squareNetEntity);

                var responseModel = _mapper.Map<SquareNetResponseModel>(squareNetEntity);
                return Ok(responseModel);
            }
            catch (Exception)
            {
                return BadRequest("Something went wrong");
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteSquareNet(Guid id)
        {
            try
            {
                await _squareNetRepository.DeleteSquareNetAsync(id);
                return NoContent();
            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return BadRequest($"Could not delete SquareNet");
            }
        }
    }
}
