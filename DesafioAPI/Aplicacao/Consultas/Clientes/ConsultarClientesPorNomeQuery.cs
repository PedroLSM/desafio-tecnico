using DesafioAPI.Dominio.Interfaces;
using MediatR;

namespace DesafioAPI.Aplicacao.Consultas.Clientes
{
    public class ConsultarClientesPorNomeQuery : IRequest<GenericoResponse>
    {
        public string Nome { get; set; }
    }

    public class ConsultarClientesPorNomeQueryHandler : IRequestHandler<ConsultarClientesPorNomeQuery, GenericoResponse>
    {
        private readonly IClienteRepository clienteRepository;

        public ConsultarClientesPorNomeQueryHandler(IClienteRepository clienteRepository)
        {
            this.clienteRepository = clienteRepository;
        }

        public async Task<GenericoResponse> Handle(ConsultarClientesPorNomeQuery request, CancellationToken cancellationToken)
        {
            var clientesPorNome = await clienteRepository.ConsultarPorNome(request.Nome);

            if (!clientesPorNome.Any())
                return GenericoResponse.FalhaResponse("", "Nenhum registro encontrado.", statusCode: System.Net.HttpStatusCode.NotFound);

            return GenericoResponse.SucessoResponse(clientesPorNome, $"Clientes que contém no nome: '{request.Nome}'.");
        }
    }
}
