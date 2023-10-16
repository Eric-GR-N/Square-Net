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

        Task CreateSquareNetAsync(SquareNet squareNet);

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

        public async Task CreateSquareNetAsync(SquareNet squareNet)
        {
            await AddAsync(squareNet);
        }

        public async Task<SquareNet?> GetSquareNetByIdAsync(Guid id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<SquareNet?> GetSquareNetByNameAsync(string name)
        {
            return await _context.SquareNets.FirstOrDefaultAsync(_ => _.Name == name);
        }
    }
}
