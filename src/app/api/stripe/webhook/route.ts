import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return new Response("Webhook signature verification failed", { status: 400 });
  }

  try {
    const supabase = await createClient();

    switch (event.type) {
      case "customer.subscription.updated":
      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { data: profile } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!profile) {
          console.error("Profile not found for customer:", customerId);
          break;
        }

        let status: "premium" | "past_due" | "canceled" = "premium";
        if (subscription.status === "past_due") {
          status = "past_due";
        } else if (subscription.status === "canceled") {
          status = "canceled";
        }

        await supabase
          .from("profiles")
          .update({ subscription_status: status })
          .eq("user_id", profile.user_id);

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { data: profile } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!profile) {
          console.error("Profile not found for customer:", customerId);
          break;
        }

        await supabase
          .from("profiles")
          .update({ subscription_status: "canceled" })
          .eq("user_id", profile.user_id);

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const { data: profile } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!profile) {
          console.error("Profile not found for customer:", customerId);
          break;
        }

        await supabase
          .from("profiles")
          .update({ subscription_status: "premium" })
          .eq("user_id", profile.user_id);

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const { data: profile } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!profile) {
          console.error("Profile not found for customer:", customerId);
          break;
        }

        await supabase
          .from("profiles")
          .update({ subscription_status: "past_due" })
          .eq("user_id", profile.user_id);

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
