import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Business, InsertBusiness, PaymentTransaction } from "@shared/schema";
import { Eye, Star, TrendingUp, CreditCard, MapPin, Phone, Mail, Globe } from "lucide-react";

export default function BusinessDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [newBusiness, setNewBusiness] = useState<InsertBusiness>({
    name: "",
    nameEn: "",
    description: "",
    descriptionEn: "",
    category: "restaurants",
    address: "",
    phone: "",
    email: "",
    website: "",
    imageUrl: "",
    latitude: null,
    longitude: null,
  });

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: businesses = [], isLoading: businessesLoading } = useQuery({
    queryKey: ["/api/my-businesses"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: paymentHistory = [] } = useQuery({
    queryKey: ["/api/payment-history"],
    enabled: isAuthenticated,
    retry: false,
  });

  const createBusinessMutation = useMutation({
    mutationFn: async (businessData: InsertBusiness) => {
      await apiRequest("POST", "/api/businesses", businessData);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Business created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/my-businesses"] });
      setNewBusiness({
        name: "",
        nameEn: "",
        description: "",
        descriptionEn: "",
        category: "restaurants",
        address: "",
        phone: "",
        email: "",
        website: "",
        imageUrl: "",
        latitude: null,
        longitude: null,
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create business",
        variant: "destructive",
      });
    },
  });

  const updateBusinessMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertBusiness> }) => {
      await apiRequest("PUT", `/api/businesses/${id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Business updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/my-businesses"] });
      setEditingBusiness(null);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update business",
        variant: "destructive",
      });
    },
  });

  const handleCreateBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    createBusinessMutation.mutate(newBusiness);
  };

  const handleUpdateBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBusiness) return;
    
    const updateData: Partial<InsertBusiness> = {
      name: editingBusiness.name,
      nameEn: editingBusiness.nameEn,
      description: editingBusiness.description,
      descriptionEn: editingBusiness.descriptionEn,
      category: editingBusiness.category,
      address: editingBusiness.address,
      phone: editingBusiness.phone,
      email: editingBusiness.email,
      website: editingBusiness.website,
      imageUrl: editingBusiness.imageUrl,
    };
    
    updateBusinessMutation.mutate({ id: editingBusiness.id, data: updateData });
  };

  const handleUpgradePremium = async (feature: string, businessId?: string) => {
    try {
      const amount = feature === "highlighted" ? 299 : 499;
      const response = await apiRequest("POST", "/api/create-payment-intent", {
        amount,
        feature,
        businessId,
      });
      const { clientSecret } = await response.json();
      
      // Redirect to checkout page with client secret
      window.location.href = `/checkout?client_secret=${clientSecret}&feature=${feature}`;
    } catch (error) {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to initiate payment",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const totalViews = businesses.reduce((sum: number, b: Business) => sum + b.viewCount, 0);
  const totalReviews = businesses.reduce((sum: number, b: Business) => sum + b.reviewCount, 0);
  const avgRating = businesses.length > 0 
    ? (businesses.reduce((sum: number, b: Business) => sum + parseFloat(b.rating), 0) / businesses.length).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-thai-slate-800 font-kanit mb-2">
            แดชบอร์ดธุรกิจ / Business Dashboard
          </h1>
          <p className="text-thai-slate-600">จัดการธุรกิจของคุณและเข้าถึงฟีเจอร์พิเศษ</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-thai-slate-600">เข้าชมรายการ</p>
                  <p className="text-3xl font-bold text-thai-slate-800">{totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-crocodile-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-thai-slate-600">รีวิวทั้งหมด</p>
                  <p className="text-3xl font-bold text-thai-slate-800">{totalReviews}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-thai-slate-600">คะแนนเฉลี่ย</p>
                  <p className="text-3xl font-bold text-thai-slate-800">{avgRating}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="businesses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="businesses">ธุรกิจของฉัน</TabsTrigger>
            <TabsTrigger value="create">สร้างธุรกิจใหม่</TabsTrigger>
            <TabsTrigger value="premium">Premium Features</TabsTrigger>
            <TabsTrigger value="payments">ประวัติการชำระเงิน</TabsTrigger>
          </TabsList>

          <TabsContent value="businesses" className="space-y-6">
            {businessesLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : businesses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <h3 className="text-xl font-semibold text-thai-slate-800 mb-2">ยังไม่มีธุรกิจ</h3>
                  <p className="text-thai-slate-600 mb-4">เริ่มต้นสร้างธุรกิจแรกของคุณ</p>
                  <Button onClick={() => document.querySelector('[value="create"]')?.click()}>
                    สร้างธุรกิจใหม่
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {businesses.map((business: Business) => (
                  <Card key={business.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="font-kanit">{business.name}</CardTitle>
                          {business.nameEn && (
                            <p className="text-sm text-thai-slate-600">{business.nameEn}</p>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingBusiness(business)}
                        >
                          แก้ไข
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-thai-slate-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {business.address}
                        </div>
                        {business.phone && (
                          <div className="flex items-center text-sm text-thai-slate-600">
                            <Phone className="h-4 w-4 mr-2" />
                            {business.phone}
                          </div>
                        )}
                        {business.email && (
                          <div className="flex items-center text-sm text-thai-slate-600">
                            <Mail className="h-4 w-4 mr-2" />
                            {business.email}
                          </div>
                        )}
                        {business.website && (
                          <div className="flex items-center text-sm text-thai-slate-600">
                            <Globe className="h-4 w-4 mr-2" />
                            {business.website}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{business.rating} ({business.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 text-crocodile-500 mr-1" />
                          <span>{business.viewCount} views</span>
                        </div>
                      </div>
                      
                      {business.isPremium && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-crocodile-100 text-crocodile-800">
                            Premium
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Edit Business Modal */}
            {editingBusiness && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <CardHeader>
                    <CardTitle className="font-kanit">แก้ไขข้อมูลธุรกิจ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateBusiness} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="edit-name">ชื่อธุรกิจ (ไทย) *</Label>
                          <Input
                            id="edit-name"
                            value={editingBusiness.name}
                            onChange={(e) => setEditingBusiness({ ...editingBusiness, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-nameEn">ชื่อธุรกิจ (English)</Label>
                          <Input
                            id="edit-nameEn"
                            value={editingBusiness.nameEn || ""}
                            onChange={(e) => setEditingBusiness({ ...editingBusiness, nameEn: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="edit-category">หมวดหมู่ *</Label>
                        <Select
                          value={editingBusiness.category}
                          onValueChange={(value) => setEditingBusiness({ ...editingBusiness, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกหมวดหมู่" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="attractions">สถานที่ท่องเที่ยว</SelectItem>
                            <SelectItem value="restaurants">ร้านอาหาร</SelectItem>
                            <SelectItem value="accommodations">ที่พัก</SelectItem>
                            <SelectItem value="homestays">โฮมสเตย์</SelectItem>
                            <SelectItem value="services">บริการ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="edit-description">คำอธิบาย (ไทย)</Label>
                        <Textarea
                          id="edit-description"
                          value={editingBusiness.description || ""}
                          onChange={(e) => setEditingBusiness({ ...editingBusiness, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="edit-address">ที่อยู่</Label>
                        <Input
                          id="edit-address"
                          value={editingBusiness.address || ""}
                          onChange={(e) => setEditingBusiness({ ...editingBusiness, address: e.target.value })}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="edit-phone">เบอร์โทรศัพท์</Label>
                          <Input
                            id="edit-phone"
                            value={editingBusiness.phone || ""}
                            onChange={(e) => setEditingBusiness({ ...editingBusiness, phone: e.target.value })}
                          />
                        </div>
                        <div>  
                          <Label htmlFor="edit-email">อีเมล</Label>
                          <Input
                            id="edit-email"
                            type="email"
                            value={editingBusiness.email || ""}
                            onChange={(e) => setEditingBusiness({ ...editingBusiness, email: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setEditingBusiness(null)}
                        >
                          ยกเลิก
                        </Button>
                        <Button 
                          type="submit"
                          disabled={updateBusinessMutation.isPending}
                        >
                          {updateBusinessMutation.isPending ? "กำลังบันทึก..." : "บันทึก"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle className="font-kanit">สร้างธุรกิจใหม่</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateBusiness} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">ชื่อธุรกิจ (ไทย) *</Label>
                      <Input
                        id="name"
                        value={newBusiness.name}
                        onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="nameEn">ชื่อธุรกิจ (English)</Label>
                      <Input
                        id="nameEn"
                        value={newBusiness.nameEn || ""}
                        onChange={(e) => setNewBusiness({ ...newBusiness, nameEn: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="category">หมวดหมู่ *</Label>
                    <Select
                      value={newBusiness.category}
                      onValueChange={(value) => setNewBusiness({ ...newBusiness, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกหมวดหมู่" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="attractions">สถานที่ท่องเที่ยว</SelectItem>
                        <SelectItem value="restaurants">ร้านอาหาร</SelectItem>
                        <SelectItem value="accommodations">ที่พัก</SelectItem>
                        <SelectItem value="homestays">โฮมสเตย์</SelectItem>
                        <SelectItem value="services">บริการ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">คำอธิบาย (ไทย)</Label>
                    <Textarea
                      id="description"
                      value={newBusiness.description || ""}
                      onChange={(e) => setNewBusiness({ ...newBusiness, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">ที่อยู่</Label>
                    <Input
                      id="address"
                      value={newBusiness.address || ""}
                      onChange={(e) => setNewBusiness({ ...newBusiness, address: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                      <Input
                        id="phone"
                        value={newBusiness.phone || ""}
                        onChange={(e) => setNewBusiness({ ...newBusiness, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">อีเมล</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newBusiness.email || ""}
                        onChange={(e) => setNewBusiness({ ...newBusiness, email: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={createBusinessMutation.isPending}
                  >
                    {createBusinessMutation.isPending ? "กำลังสร้าง..." : "สร้างธุรกิจ"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="premium">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-kanit">รายการเด่น (Highlighted Listing)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-thai-slate-600 mb-4">
                    แสดงรายการของคุณในหน้าแรกและหมวดหมู่ที่เกี่ยวข้อง เพิ่มโอกาสเข้าชมและการติดต่อ
                  </p>
                  <div className="text-2xl font-bold text-crocodile-600 mb-4">฿299/เดือน</div>
                  <Button 
                    onClick={() => handleUpgradePremium("highlighted")}
                    className="w-full"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    อัพเกรดเป็นรายการเด่น
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="font-kanit">ทัวร์เสมือนจริง (Virtual Tour)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-thai-slate-600 mb-4">
                    เพิ่มทัวร์ 360 องศา ให้ลูกค้าสามารถชมธุรกิจของคุณแบบเสมือนจริงก่อนการเดินทาง
                  </p>
                  <div className="text-2xl font-bold text-crocodile-600 mb-4">฿499/ครั้ง</div>
                  <Button 
                    onClick={() => handleUpgradePremium("virtual-tour")}
                    className="w-full"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    เพิ่มทัวร์เสมือนจริง
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="font-kanit">ประวัติการชำระเงิน</CardTitle>
              </CardHeader>
              <CardContent>
                {paymentHistory.length === 0 ? (
                  <div className="text-center py-8 text-thai-slate-600">
                    ยังไม่มีประวัติการชำระเงิน
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentHistory.map((transaction: PaymentTransaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{transaction.feature}</p>
                          <p className="text-sm text-thai-slate-600">
                            {new Date(transaction.createdAt).toLocaleDateString('th-TH')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">฿{parseFloat(transaction.amount).toLocaleString()}</p>
                          <p className={`text-sm ${
                            transaction.status === 'succeeded' ? 'text-green-600' :
                            transaction.status === 'failed' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {transaction.status === 'succeeded' ? 'สำเร็จ' :
                             transaction.status === 'failed' ? 'ล้มเหลว' : 'รอดำเนินการ'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
