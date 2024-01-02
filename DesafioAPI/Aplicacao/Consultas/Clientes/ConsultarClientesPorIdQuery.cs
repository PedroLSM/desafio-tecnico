using DesafioAPI.Dominio.Interfaces;
using MediatR;

namespace DesafioAPI.Aplicacao.Consultas.Clientes
{
    public class ConsultarClientesPorIdQuery : IRequest<GenericoResponse>
    {
        public int Id { get; set; }
    }

    public class ConsultarClientesPorIdQueryHandler : IRequestHandler<ConsultarClientesPorIdQuery, GenericoResponse>
    {
        private readonly IClienteRepository clienteRepository;

        public ConsultarClientesPorIdQueryHandler(IClienteRepository clienteRepository)
        {
            this.clienteRepository = clienteRepository;
        }

        public async Task<GenericoResponse> Handle(ConsultarClientesPorIdQuery request, CancellationToken cancellationToken)
        {
            var clientePorId = await clienteRepository.ConsultarPorId(request.Id);

            if (clientePorId is null)
                return GenericoResponse.FalhaResponse("", "Nenhum registro encontrado.", statusCode: System.Net.HttpStatusCode.NotFound);

            return GenericoResponse.SucessoResponse(clientePorId, $"Cliente que contém id: '{request.Id}'.");
        }
    }
}
