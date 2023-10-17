using Application.Exceptions;
using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public interface ISquareNetRepository
    {
        Task<List<SquareNet>> GetSquareNetsByUserIdAsync(Guid id);
        Task<SquareNet?> GetSquareNetByIdAsync(Guid id);
        Task<SquareNet?> GetSquareNetByNameAsync(string name);
        Task UpdateSquareNetAsync(SquareNet updatedSquare);

        Task<SquareNet> CreateSquareNetAsync(SquareNet squareNet);
        Task DeleteSquareNetAsync(Guid id);

    }
    public class SquareNetRepository : RepositoryBase<SquareNet>, ISquareNetRepository
    {
        public SquareNetRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public async Task<List<SquareNet>> GetSquareNetsByUserIdAsync(Guid userId)
        {
            return await _context.SquareNets.Where(_ => _.ApplicationUserId == userId).Include(_ => _.Squares).ToListAsync();
        }

        public async Task UpdateSquareNetAsync(SquareNet updatedSquare)
        {
            await UpdateAsync(updatedSquare);
        }

        public async Task<SquareNet> CreateSquareNetAsync(SquareNet squareNet)
        {
            return await AddAsync(squareNet);
        }

        public async Task<SquareNet?> GetSquareNetByIdAsync(Guid id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<SquareNet?> GetSquareNetByNameAsync(string name)
        {
            return await _context.SquareNets.FirstOrDefaultAsync(_ => _.Name == name);
        }

        public async Task DeleteSquareNetAsync(Guid id)
        {
            var squareNet = await GetByIdAsync(id);
            if (squareNet != null)
            {
                Remove(squareNet);
            }
            else
            {
                throw new EntityNotFoundException($"SquareNet with ID {id} was not found.");
            }
        }
    }
}
