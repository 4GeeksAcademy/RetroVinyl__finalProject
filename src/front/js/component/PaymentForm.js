import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const PaymentForm = ({ amount, onPaymentSuccess, cantidad, album_id }) => {
    const { store, actions } = useContext(Context);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [clientSecret, setClientSecret] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token")


    // Solicita la creación del PaymentIntent al montar el componente
    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}api/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // Se espera que el backend convierta el monto a centavos si es necesario
            body: JSON.stringify({ amount })
        })
            .then(res => res.json())
            .then(data => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    setError("Error al generar el PaymentIntent");
                }
            })
            .catch(err => setError(err.message));
    }, [amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements || !clientSecret) {
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                // billing_details: {
                //     name: shipping.name,
                //     address: {
                //         line1: shipping.address,
                //         cp: shipping.cp,
                //         city: shipping.city,
                //         country: shipping.country
                //     }
                // }
            },
            // shipping: {
            //     name: shipping.name,
            //     address: {
            //         line1: shipping.address,
            //         cp: shipping.cp,
            //         city: shipping.city,
            //         country: shipping.country
            //     }
            // }
        });

        if (result.error) {
            setError(result.error.message);
        } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
            guardarPedido();
            onPaymentSuccess();

        }
        window.location.href = "/pedidos"; //fuerza una recarga completa del navegador, abandonando todo el estado de React y volviendo a cargar completamente la aplicación.
        setLoading(false);
    };
    const guardarPedido = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}api/pedidos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            // Se espera que el backend convierta el monto a centavos si es necesario
            body: JSON.stringify({
                album_id: album_id,
                precio_total: amount,
                cantidad: cantidad
            })
        })
        const data = await response.json()
        console.log(data);

    }

    return clientSecret ? (
        <form className="text-black" onSubmit={handleSubmit}>

            <div style={{ margin: "20px 0" }}>
                <CardElement />
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button type="submit" disabled={!stripe || loading}>
                {loading ? "Procesando..." : `Pagar ${amount}€`}
            </button>
        </form>
    ) : (
        <p>Cargando...</p>
    );
};
