"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import {
  Calendar,
  Search,
  Download,
  CreditCard,
  Wallet,
  Smartphone,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const paymentHistory = [
  {
    id: 1,
    rentalId: 1,
    item: {
      id: 1,
      name: "Professional Camera Kit",
      image:
        "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBnZWFyfGVufDF8fHx8MTc2MzA4Mjg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    type: "Payment",
    amount: 225,
    paymentMethod: "bKash",
    transactionId: "BKH20241120XYZ789",
    status: "Completed",
    date: "2024-11-20",
    description: "Rental payment for Professional Camera Kit",
  },
  {
    id: 2,
    rentalId: 2,
    item: {
      id: 3,
      name: "Camping Tent",
      image:
        "https://images.unsplash.com/photo-1596055746427-d5f61aa5df99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwZ2VhcnxlbnwxfHx8fDE3NjMwODI4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    type: "Payment",
    amount: 105,
    paymentMethod: "Cash",
    transactionId: null,
    status: "Completed",
    date: "2024-11-15",
    description: "Cash payment for Camping Tent rental",
  },
  {
    id: 3,
    rentalId: 3,
    item: {
      id: 4,
      name: "Guitar & Amplifier",
      image:
        "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2FsJTIwaW5zdHJ1bWVudHN8ZW58MXx8fHwxNzYzMDgyODY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    type: "Payment",
    amount: 120,
    paymentMethod: "Nagad",
    transactionId: "NGD20241125ABC456",
    status: "Pending",
    date: "2024-11-25",
    description: "Rental payment for Guitar & Amplifier",
  },
  {
    id: 4,
    rentalId: 4,
    item: {
      id: 2,
      name: "Power Drill Set",
      image:
        "https://images.unsplash.com/photo-1683115099413-5b7d85c2950c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMHRvb2xzfGVufDF8fHx8MTc2MzAyMjA5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    type: "Received",
    amount: 100,
    paymentMethod: "Rocket",
    transactionId: "RKT20241118DEF123",
    status: "Completed",
    date: "2024-11-18",
    description: "Payment received for Power Drill Set rental",
  },
];

export default function PaymentHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMethod, setFilterMethod] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const getPaymentIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "cash":
        return <Wallet className="size-5" />;
      case "bkash":
      case "nagad":
      case "rocket":
        return <Smartphone className="size-5" />;
      default:
        return <CreditCard className="size-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case "bkash":
        return "text-pink-600 bg-pink-50";
      case "nagad":
        return "text-orange-600 bg-orange-50";
      case "rocket":
        return "text-purple-600 bg-purple-50";
      case "cash":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const filteredPayments = paymentHistory.filter((payment) => {
    const matchesSearch =
      payment.item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMethod =
      filterMethod === "all" ||
      payment.paymentMethod.toLowerCase() === filterMethod.toLowerCase();
    const matchesStatus =
      filterStatus === "all" ||
      payment.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesTab =
      activeTab === "all" ||
      payment.type.toLowerCase() === activeTab.toLowerCase();

    return matchesSearch && matchesMethod && matchesStatus && matchesTab;
  });

  const totalPaid = paymentHistory
    .filter((p) => p.type === "Payment" && p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalReceived = paymentHistory
    .filter((p) => p.type === "Received" && p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const handleExport = () => {
    // Mock export functionality
    alert("Exporting payment history...");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Payment History</h1>
          <p className="text-gray-600">View all your transactions</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="size-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Paid</p>
                <p className="text-indigo-600">৳{totalPaid}</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <CreditCard className="size-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Received</p>
                <p className="text-green-600">৳{totalReceived}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Wallet className="size-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
                <p>{paymentHistory.length}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Filter className="size-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by item name or transaction ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterMethod} onValueChange={setFilterMethod}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="bkash">bKash</SelectItem>
                <SelectItem value="nagad">Nagad</SelectItem>
                <SelectItem value="rocket">Rocket</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="payment">Paid</TabsTrigger>
          <TabsTrigger value="received">Received</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {filteredPayments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="size-8 text-gray-400" />
                </div>
                <h3 className="mb-2">No Transactions Found</h3>
                <p className="text-gray-600 text-sm">
                  Try adjusting your filters or search query
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPayments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-20 aspect-square overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={payment.item.image}
                        alt={payment.item.name}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Link href={`/my-rentals/${payment.rentalId}`}>
                              <h3 className="hover:text-indigo-600">
                                {payment.item.name}
                              </h3>
                            </Link>
                            <Badge
                              className={`${
                                payment.type === "Payment"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {payment.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {payment.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="size-4" />
                          <span>{payment.date}</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg ${getPaymentMethodColor(
                            payment.paymentMethod
                          )}`}
                        >
                          {getPaymentIcon(payment.paymentMethod)}
                          <span className="font-medium">
                            {payment.paymentMethod}
                          </span>
                        </div>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                        <span
                          className={`font-medium ${
                            payment.type === "Payment"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {payment.type === "Payment" ? "-" : "+"}৳
                          {payment.amount}
                        </span>
                      </div>
                      {payment.transactionId && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>Transaction ID:</span>
                          <span className="font-mono">
                            {payment.transactionId}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="payment" className="space-y-4 mt-6">
          {filteredPayments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="size-8 text-gray-400" />
                </div>
                <h3 className="mb-2">No Transactions Found</h3>
                <p className="text-gray-600 text-sm">
                  Try adjusting your filters or search query
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPayments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-20 aspect-square overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={payment.item.image}
                        alt={payment.item.name}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Link href={`/my-rentals/${payment.rentalId}`}>
                              <h3 className="hover:text-indigo-600">
                                {payment.item.name}
                              </h3>
                            </Link>
                            <Badge
                              className={`${
                                payment.type === "Payment"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {payment.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {payment.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="size-4" />
                          <span>{payment.date}</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg ${getPaymentMethodColor(
                            payment.paymentMethod
                          )}`}
                        >
                          {getPaymentIcon(payment.paymentMethod)}
                          <span className="font-medium">
                            {payment.paymentMethod}
                          </span>
                        </div>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                        <span
                          className={`font-medium ${
                            payment.type === "Payment"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {payment.type === "Payment" ? "-" : "+"}৳
                          {payment.amount}
                        </span>
                      </div>
                      {payment.transactionId && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>Transaction ID:</span>
                          <span className="font-mono">
                            {payment.transactionId}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="received" className="space-y-4 mt-6">
          {filteredPayments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="size-8 text-gray-400" />
                </div>
                <h3 className="mb-2">No Transactions Found</h3>
                <p className="text-gray-600 text-sm">
                  Try adjusting your filters or search query
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPayments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-20 aspect-square overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={payment.item.image}
                        alt={payment.item.name}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Link href={`/my-rentals/${payment.rentalId}`}>
                              <h3 className="hover:text-indigo-600">
                                {payment.item.name}
                              </h3>
                            </Link>
                            <Badge
                              className={`${
                                payment.type === "Payment"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {payment.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {payment.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="size-4" />
                          <span>{payment.date}</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg ${getPaymentMethodColor(
                            payment.paymentMethod
                          )}`}
                        >
                          {getPaymentIcon(payment.paymentMethod)}
                          <span className="font-medium">
                            {payment.paymentMethod}
                          </span>
                        </div>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                        <span
                          className={`font-medium ${
                            payment.type === "Payment"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {payment.type === "Payment" ? "-" : "+"}৳
                          {payment.amount}
                        </span>
                      </div>
                      {payment.transactionId && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>Transaction ID:</span>
                          <span className="font-mono">
                            {payment.transactionId}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
