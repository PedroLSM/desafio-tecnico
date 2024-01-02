using DesafioAPI.Dominio.Interfaces;
using MediatR;

namespace DesafioAPI.Aplicacao.Consultas.Cidades
{
    public class ConsultarCidadePorEstadoQuery : IRequest<GenericoResponse>
    {
        public string Estado { get; set; }
    }

    public class ConsultarCidadePorEstadoQueryHandler : IRequestHandler<ConsultarCidadePorEstadoQuery, GenericoResponse>
    {
        private readonly ICidadeRepository cidadeRepository;

        public ConsultarCidadePorEstadoQueryHandler(ICidadeRepository cidadeRepository)
        {
            this.cidadeRepository = cidadeRepository;
        }

        public async Task<GenericoResponse> Handle(ConsultarCidadePorEstadoQuery request, CancellationToken cancellationToken)
        {
            var cidadesPorEstado = await cidadeRepository.ConsultarPorEstado(request.Estado);

            if (!cidadesPorEstado.Any())
                return GenericoResponse.FalhaResponse("", "Nenhum registro encontrado.", statusCode: System.Net.HttpStatusCode.NotFound);

            return GenericoResponse.SucessoResponse(cidadesPorEstado, $"Cidades que contém no estado: '{request.Estado}'.");
        }
    }
}
