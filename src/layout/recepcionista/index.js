import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SideBarStore from "../../components/side-bar-store";
import TopLayout from "../../components/top-layout";
import CambioForm from "../../containers/cambio-form";
import LimpiezaForm from "../../containers/limpieza-form";
import GrabadoForm from "../../containers/grabado-form";
import PulidoForm from "../../containers/pulido-form";
import ReparacionForm from "../../containers/reparacion-form";
import Pedidos from "../../containers/pedidos";
import { getAllClients, getAllPedidos, updatePedido } from "../../api";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import DetallePedido from "../../containers/detalle-pedido";
import { useNotificationProvider } from "../../components/notification.provider";

const data22 = [
  {
    folio: "12345",
    cliente: "Suzclem Adriana Ochoa Casillas",
    servicio: "Reparación",
    estado: "Procesando"
  }
];

function Recepcionista(props) {
  const { notify } = useNotificationProvider();
  const [pedidos, setpedidos] = useState(undefined);
  const [clientes, setclientes] = useState(undefined);
  const [pedidoInfo, setpedidoInfo] = useState("");
  const [clientInfo, setclientInfo] = useState("");
  const [pedidoUpdated, setpedidoUpdated] = useState("");

  useEffect(async () => {
    const result = await getAllPedidos();
    setpedidos(result.data);
  }, []);

  useEffect(async () => {
    const result = await getAllClients();
    setclientes(result.data);
  }, []);

  if (pedidos === undefined || clientes === undefined)
    return (
      <div>
        <LinearProgress color="secondary" />
      </div>
    );

  var data = pedidos.map(pedido => {
    var cliente = clientes.find(client => client.id === pedido.cliente_id);

    return {
      folio: pedido.folio,
      cliente: `${cliente.nombre} ${cliente.apellido_paterno} ${cliente.apellido_materno}`,
      servicio: pedido.servicio,
      estado: pedido.estado
    };
  });

  async function onRowClick(pedido) {
    console.log(pedido.Folio);
    const pedidoInfo = pedidos.find(p => p.folio == pedido.Folio);
    const clientInfo = clientes.find(
      cliente => cliente.id == pedidoInfo.cliente_id
    );
    setpedidoUpdated(pedidoInfo);

    setpedidoInfo({
      id: pedidoInfo.id,
      folio: pedidoInfo.folio,
      serv: pedidoInfo.servicio,
      product: pedidoInfo.joya.nombre_joya,
      weight: pedidoInfo.joya.peso_joya,
      descripcion: pedidoInfo.descripcion,
      cantidad: pedidoInfo.presupuesto.total,
      hechura: pedidoInfo.presupuesto.hechura,
      material_utilizar: pedidoInfo.material_utilizar,
      estado_tienda: pedidoInfo.estado_tienda,
      estado_taller: pedidoInfo.estado_taller,
      servicio: pedido.Servicio
    });
    setclientInfo({
      name: `${clientInfo.nombre} ${clientInfo.apellido_paterno} ${clientInfo.apellido_materno}`,
      tel: clientInfo.telefono,
      email: clientInfo.correo
    });

    props.history.push("/recepcionist/detalle-pedido");
  }

  function onClickVolver() {
    props.history.push("/recepcionist/pedidos");
  }

  async function onClickEstado() {
    if (pedidoUpdated.estado_tienda === "Enviar joya") {
      pedidoUpdated.estado_tienda = "Recibir joya";
      pedidoUpdated.estado = "En taller";
      notify("La joya ha sido enviada a taller");
    }

    if (pedidoInfo.estado_tienda === "Recibir joya") {
      pedidoUpdated.estado_tienda = "Entregar joya";
      notify("La joya ha sido recibida");
    }

    if (pedidoInfo.estado_tienda === "Entregar joya") {
      pedidoUpdated.estado_tienda = "Terminado";
      pedidoUpdated.estado = "Terminado";
      notify("La joya ha sido entregada al cliente");
    }

    await updatePedido(pedidoUpdated.id, pedidoUpdated);
    props.history.push("/recepcionist/pedidos");
  }

  function onClickSalir() {
    props.history.push("/login");
  }

  return (
    <div>
      <div>
        <TopLayout onClickSalir={onClickSalir} />
      </div>
      <div
        style={{
          width: "100%",
          height: "1507px",
          backgroundColor: "#F4F6F8"
        }}
      >
        <div
          style={{
            display: "inline-block",
            width: "fit-content",
            height: "100%",
            float: "left",
            position: "relative"
          }}
        >
          <SideBarStore />
        </div>
        <div
          style={{
            display: "inline-block",
            width: "calc(100vw - 304px)",
            height: "fit-content"
          }}
        >
          <Switch>
            <Route
              path="/recepcionist/detalle-pedido"
              component={() => (
                <DetallePedido
                  onClickVolver={onClickVolver}
                  onClickEstado={onClickEstado}
                  folio={pedidoInfo.folio}
                  name={clientInfo.name}
                  tel={clientInfo.tel}
                  email={clientInfo.email}
                  serv={pedidoInfo.serv}
                  product={pedidoInfo.product}
                  weight={pedidoInfo.weight}
                  descripcion={pedidoInfo.descripcion}
                  cantidad={pedidoInfo.cantidad}
                  hechura={pedidoInfo.hechura}
                  material_utilizar={pedidoInfo.material_utilizar}
                  estado_tienda={pedidoInfo.estado_tienda}
                  estado_taller={pedidoInfo.estado_taller}
                  servicio={pedidoInfo.servicio}
                />
              )}
            />
            <Route
              path="/recepcionist/pedidos"
              component={() => (
                <Pedidos
                  onRowClick={onRowClick}
                  data={data.filter(pedido => pedido.estado !== "Terminado")}
                />
              )}
            />
            <Route
              path="/recepcionist/pedidos-terminados"
              component={() => (
                <Pedidos
                  onRowClick={onRowClick}
                  data={data.filter(pedido => pedido.estado === "Terminado")}
                />
              )}
            />
            <Route path="/recepcionist/cambio-form" component={CambioForm} />
            <Route
              path="/recepcionist/limpieza-form"
              component={LimpiezaForm}
            />
            <Route path="/recepcionist/grabado-form" component={GrabadoForm} />
            <Route path="/recepcionist/pulido-form" component={PulidoForm} />
            <Route
              path="/recepcionist/reparacion-form"
              component={ReparacionForm}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Recepcionista;
