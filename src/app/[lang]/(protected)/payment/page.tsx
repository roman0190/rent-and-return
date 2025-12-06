"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Wallet, Smartphone, CheckCircle2, AlertCircle } from "lucide-react";

type PaymentMethod = "cash" | "bkash" | "nagad" | "rocket";

interface PaymentData {
  itemName: string;
  amount: number;
  days: number;
  startDate: string;
  endDate: string;
}

export default function PaymentMethodPage() {
  const router = useRouter();
  const paymentData: PaymentData = {
    itemName: "Professional Camera Kit",
    amount: 225,
    days: 5,
    startDate: "2024-11-20",
    endDate: "2024-11-25",
  };

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("cash");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const paymentMethods = [
    {
      id: "cash" as PaymentMethod,
      name: "Cash Payment",
      description: "Pay with cash upon delivery/pickup",
      icon: Wallet,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "bkash" as PaymentMethod,
      name: "bKash",
      description: "Pay with bKash mobile banking",
      icon: Smartphone,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      id: "nagad" as PaymentMethod,
      name: "Nagad",
      description: "Pay with Nagad mobile banking",
      icon: Smartphone,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "rocket" as PaymentMethod,
      name: "Rocket",
      description: "Pay with Rocket mobile banking",
      icon: Smartphone,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const handlePayment = async () => {
    // Validate mobile banking inputs
    if (selectedMethod !== "cash") {
      if (!phoneNumber || phoneNumber.length !== 11) {
        setIsErrorOpen(true);
        return;
      }
      if (!transactionId) {
        setIsErrorOpen(true);
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccessOpen(true);
    }, 2000);
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
    router.push("/my-rentals");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="mb-2">Payment Method</h1>
        <p className="text-gray-600">Choose your preferred payment method</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Selection */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Select Payment Method</h2>
              <RadioGroup
                value={selectedMethod}
                onValueChange={(value) =>
                  setSelectedMethod(value as PaymentMethod)
                }
              >
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedMethod === method.id
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className={`p-3 rounded-lg ${method.bgColor}`}>
                          <Icon className={`size-6 ${method.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-600">
                            {method.description}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Mobile Banking Details */}
          {selectedMethod !== "cash" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">
                  {paymentMethods.find((m) => m.id === selectedMethod)?.name}{" "}
                  Details
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 mb-2">
                      <strong>Payment Instructions:</strong>
                    </p>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>
                        Open your{" "}
                        {
                          paymentMethods.find((m) => m.id === selectedMethod)
                            ?.name
                        }{" "}
                        app
                      </li>
                      <li>
                        Send Money to: <strong>01XXXXXXXXX</strong>
                      </li>
                      <li>
                        Amount: <strong>৳{paymentData.amount}</strong>
                      </li>
                      <li>Enter the transaction ID below</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Your Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      maxLength={11}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transactionId">Transaction ID</Label>
                    <Input
                      id="transactionId"
                      type="text"
                      placeholder="Enter transaction ID"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">
                      You will receive a transaction ID after completing the
                      payment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Cash Payment Info */}
          {selectedMethod === "cash" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">Cash Payment Instructions</h2>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 mb-2">
                    <strong>Payment will be collected:</strong>
                  </p>
                  <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                    <li>
                      Cash payment of <strong>৳{paymentData.amount}</strong>{" "}
                      will be collected
                    </li>
                    <li>Payment due upon pickup/delivery of the item</li>
                    <li>Make sure to have exact change if possible</li>
                    <li>
                      You can discuss payment details with the owner via chat
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Item</p>
                  <p className="font-medium">{paymentData.itemName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rental Period</p>
                  <p className="text-sm">{paymentData.startDate}</p>
                  <p className="text-sm">{paymentData.endDate}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {paymentData.days} days
                  </p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>৳{paymentData.amount}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service Fee</span>
                    <span>৳0</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-medium">Total</span>
                    <span className="text-indigo-600">
                      ৳{paymentData.amount}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Confirm Payment"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle2 className="size-12 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center">
              Payment Successful!
            </DialogTitle>
            <DialogDescription className="text-center">
              {selectedMethod === "cash"
                ? "Your rental request has been confirmed. Cash payment will be collected upon pickup/delivery."
                : `Your payment via ${
                    paymentMethods.find((m) => m.id === selectedMethod)?.name
                  } has been received and is being verified.`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Amount Paid</span>
                <span className="text-sm font-medium">
                  ৳{paymentData.amount}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Payment Method</span>
                <span className="text-sm font-medium">
                  {paymentMethods.find((m) => m.id === selectedMethod)?.name}
                </span>
              </div>
              {selectedMethod !== "cash" && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Transaction ID</span>
                  <span className="text-sm font-medium">{transactionId}</span>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={handleSuccessClose}>
              View My Rentals
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={isErrorOpen} onOpenChange={setIsErrorOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="size-12 text-red-600" />
              </div>
            </div>
            <DialogTitle className="text-center">Payment Failed</DialogTitle>
            <DialogDescription className="text-center">
              Please check your phone number and transaction ID and try again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsErrorOpen(false)}
            >
              Try Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
