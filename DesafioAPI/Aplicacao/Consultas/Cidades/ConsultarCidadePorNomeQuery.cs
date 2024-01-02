using DesafioAPI.Dominio.Interfaces;
using MediatR;

namespace DesafioAPI.Aplicacao.Consultas.Cidades
{
    public class ConsultarCidadePorNomeQuery : IRequest<GenericoResponse>
    {
        public string Nome { get; set; }
    }

    public class ConsultarCidadePorNomeQueryHandler : IRequestHandler<ConsultarCidadePorNomeQuery, GenericoResponse>
    {
        private readonly ICidadeRepository cidadeRepository;

        public ConsultarCidadePorNomeQueryHandler(ICidadeRepository cidadeRepository)
        {
            this.cidadeRepository = cidadeRepository;
        }

        public async Task<GenericoResponse> Handle(ConsultarCidadePorNomeQuery request, CancellationToken cancellationToken)
        {
            var cidadesPorNome = await cidadeRepository.ConsultarPorNome(request.Nome);

            if (!cidadesPorNome.Any())
                return GenericoResponse.FalhaResponse("", "Nenhum registro encontrado.", statusCode: System.Net.HttpStatusCode.NotFound);

            return GenericoResponse.SucessoResponse(cidadesPorNome, $"Cidades que contém no nome: '{request.Nome}'.");
        }
    }
}
