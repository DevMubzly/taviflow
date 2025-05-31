"use client"

import { DialogFooter } from "@/components/ui/dialog"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Building2,
  Check,
  ChevronRight,
  CreditCard,
  Loader2,
  Map,
  Phone,
  Plus,
  Settings,
  Trash2,
  UploadCloud,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/app/hooks/use-toast"
import { cn } from "@/lib/utils"

// Define TypeScript interfaces for our data structures
interface PaymentDetails {
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
  mtnNumber: string
  airtelNumber: string
}

interface Branch {
  id: number
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  phoneNumber: string
  email: string
  manager: string
  isMain: boolean
}

interface FormData {
  businessName: string
  industry: string
  address: string
  city: string
  state: string
  zipCode: string
  description: string
  phoneNumber: string
  email: string
  website: string
  services: string[]
  logo: File | null
  branches: Branch[]
  paymentDetails: PaymentDetails
}

interface ErrorState {
  businessName?: string
  industry?: string
  description?: string
  email?: string
  phoneNumber?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  services?: string
  mainBranch?: string
  mainBranchAddress?: string
  mainBranchCity?: string
  mainBranchState?: string
  mainBranchZipCode?: string
  mainBranchPhone?: string
  cardNumber?: string
  cardName?: string
  expiryDate?: string
  cvv?: string
  mobileNumber?: string
  mtnNumber?: string
  airtelNumber?: string
  branch?: {
    name?: string
    address?: string
    city?: string
    state?: string
    zipCode?: string
    phoneNumber?: string
  }
}

interface StepLoadingState {
  1: boolean
  2: boolean
  3: boolean
  4: boolean
  5: boolean
}

export default function CreateBusinessPage(){
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    industry: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    description: "",
    phoneNumber: "",
    email: "",
    website: "",
    services: [],
    logo: null,
    branches: [
      {
        id: 1,
        name: "Main Branch",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        email: "",
        manager: "",
        isMain: true,
      },
    ],
    paymentDetails: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      mtnNumber: "",
      airtelNumber: "",
    },
  })

  // Initialize main branch with business details when step 4 is reached
  useEffect(() => {
    if (step === 4 && formData.branches.some((b) => b.isMain && !b.address)) {
      const mainBranch = formData.branches.find((b) => b.isMain)
      if (mainBranch && !mainBranch.address) {
        setFormData({
          ...formData,
          branches: formData.branches.map((branch) =>
            branch.isMain
              ? {
                  ...branch,
                  address: formData.address,
                  city: formData.city,
                  state: formData.state,
                  zipCode: formData.zipCode,
                  phoneNumber: formData.phoneNumber,
                  email: formData.email,
                  manager: "", // Explicitly set manager to blank
                }
              : branch,
          ),
        })
      }
    }
  }, [step, formData])

  const [currentBranch, setCurrentBranch] = useState<Branch>({
    id: 0,
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    manager: "",
    isMain: false,
  })
  const [branchModalOpen, setBranchModalOpen] = useState<boolean>(false)
  const [editingBranchId, setEditingBranchId] = useState<number | null>(null)
  const [errors, setErrors] = useState<ErrorState>({})
  const [stepLoading, setStepLoading] = useState<StepLoadingState>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      paymentDetails: {
        ...formData.paymentDetails,
        [name]: value,
      },
    })
  }

  const handleServiceChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target
    const servicesArray = value.split(",").map((service) => service.trim())
    setFormData({
      ...formData,
      services: servicesArray,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        logo: e.target.files[0],
      })
    }
  }

  const validateStep = (): boolean => {
    const stepErrors: ErrorState = {}
    let isValid = true

    if (step === 1) {
      if (!formData.businessName.trim()) {
        stepErrors.businessName = "Business name is required"
        isValid = false
      }
      if (!formData.industry) {
        stepErrors.industry = "Please select an industry"
        isValid = false
      }
      if (!formData.description.trim()) {
        stepErrors.description = "Business description is required"
        isValid = false
      }
      if (!formData.email.trim()) {
        stepErrors.email = "Email is required"
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        stepErrors.email = "Email is invalid"
        isValid = false
      }
      if (!formData.phoneNumber.trim()) {
        stepErrors.phoneNumber = "Phone number is required"
        isValid = false
      }
    } else if (step === 2) {
      if (!formData.address.trim()) {
        stepErrors.address = "Address is required"
        isValid = false
      }
      if (!formData.city.trim()) {
        stepErrors.city = "City is required"
        isValid = false
      }
      if (!formData.state.trim()) {
        stepErrors.state = "State is required"
        isValid = false
      }
      if (!formData.zipCode.trim()) {
        stepErrors.zipCode = "Zip code is required"
        isValid = false
      }
    } else if (step === 3) {
      if (formData.services.length === 0) {
        stepErrors.services = "At least one service is required"
        isValid = false
      }
    } else if (step === 4) {
      // Validate main branch data
      const mainBranch = formData.branches.find((branch) => branch.isMain)
      if (!mainBranch) {
        stepErrors.mainBranch = "Main branch is required"
        isValid = false
      } else {
        if (!mainBranch.address.trim()) {
          stepErrors.mainBranchAddress = "Main branch address is required"
          isValid = false
        }
        if (!mainBranch.city.trim()) {
          stepErrors.mainBranchCity = "Main branch city is required"
          isValid = false
        }
        if (!mainBranch.state.trim()) {
          stepErrors.mainBranchState = "Main branch state is required"
          isValid = false
        }
        if (!mainBranch.zipCode.trim()) {
          stepErrors.mainBranchZipCode = "Main branch zip code is required"
          isValid = false
        }
        if (!mainBranch.phoneNumber.trim()) {
          stepErrors.mainBranchPhone = "Main branch phone number is required"
          isValid = false
        }
      }
    } else if (step === 5) {
      // Payment validation
      if (!formData.paymentDetails.cardNumber.trim()) {
        stepErrors.cardNumber = "Card number is required"
        isValid = false
      } else if (!/^\d{16}$/.test(formData.paymentDetails.cardNumber.replace(/\s/g, ""))) {
        stepErrors.cardNumber = "Card number must be 16 digits"
        isValid = false
      }

      if (!formData.paymentDetails.cardName.trim()) {
        stepErrors.cardName = "Name on card is required"
        isValid = false
      }

      if (!formData.paymentDetails.expiryDate.trim()) {
        stepErrors.expiryDate = "Expiry date is required"
        isValid = false
      } else if (!/^\d{2}\/\d{2}$/.test(formData.paymentDetails.expiryDate)) {
        stepErrors.expiryDate = "Expiry date must be in MM/YY format"
        isValid = false
      }

      if (!formData.paymentDetails.cvv.trim()) {
        stepErrors.cvv = "CVV is required"
        isValid = false
      } else if (!/^\d{3,4}$/.test(formData.paymentDetails.cvv)) {
        stepErrors.cvv = "CVV must be 3 or 4 digits"
        isValid = false
      }

      // Check that at least one mobile money number is provided
      if (
        (!formData.paymentDetails.mtnNumber || !formData.paymentDetails.mtnNumber.trim()) &&
        (!formData.paymentDetails.airtelNumber || !formData.paymentDetails.airtelNumber.trim())
      ) {
        stepErrors.mobileNumber = "At least one mobile money number is required"
        isValid = false
      } else {
        // Validate MTN number format if provided
        if (
          formData.paymentDetails.mtnNumber &&
          formData.paymentDetails.mtnNumber.trim() &&
          !/^077\d{7}$/.test(formData.paymentDetails.mtnNumber.replace(/\s/g, ""))
        ) {
          stepErrors.mtnNumber = "MTN number must be in the format 077XXXXXXX"
          isValid = false
        }

        // Validate Airtel number format if provided
        if (
          formData.paymentDetails.airtelNumber &&
          formData.paymentDetails.airtelNumber.trim() &&
          !/^075\d{7}$/.test(formData.paymentDetails.airtelNumber.replace(/\s/g, ""))
        ) {
          stepErrors.airtelNumber = "Airtel number must be in the format 075XXXXXXX"
          isValid = false
        }
      }
    }

    setErrors(stepErrors)
    return isValid
  }

  const nextStep = (): void => {
    if (validateStep()) {
      setStepLoading({ ...stepLoading, [step]: true })

      // Simulate API call or data processing
      setTimeout(() => {
        setStepLoading({ ...stepLoading, [step]: false })
        setStep(step + 1)
        window.scrollTo(0, 0)
      }, 1000)
    }
  }

  const prevStep = (): void => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleEditBranch = (branch: Branch): void => {
    setCurrentBranch({ ...branch })
    setEditingBranchId(branch.id)
    setBranchModalOpen(true)
  }

  const handleAddBranch = (): void => {
    // Validate branch data
    const branchErrors: {
      name?: string
      address?: string
      city?: string
      state?: string
      zipCode?: string
      phoneNumber?: string
    } = {}
    let isValid = true

    if (!currentBranch.name.trim()) {
      branchErrors.name = "Branch name is required"
      isValid = false
    }
    if (!currentBranch.address.trim()) {
      branchErrors.address = "Branch address is required"
      isValid = false
    }
    if (!currentBranch.city.trim()) {
      branchErrors.city = "City is required"
      isValid = false
    }
    if (!currentBranch.state.trim()) {
      branchErrors.state = "State is required"
      isValid = false
    }
    if (!currentBranch.zipCode.trim()) {
      branchErrors.zipCode = "Zip code is required"
      isValid = false
    }
    if (!currentBranch.phoneNumber.trim()) {
      branchErrors.phoneNumber = "Phone number is required"
      isValid = false
    }

    if (isValid) {
      if (editingBranchId) {
        // Update existing branch
        setFormData({
          ...formData,
          branches: formData.branches.map((branch) =>
            branch.id === editingBranchId ? { ...currentBranch, id: editingBranchId } : branch,
          ),
        })
        setEditingBranchId(null)
        toast({
          title: "Branch updated",
          description: `${currentBranch.name} has been updated.`,
        })
      } else {
        // Add new branch
        setFormData({
          ...formData,
          branches: [...formData.branches, { ...currentBranch, id: Date.now() }],
        })
        toast({
          title: "Branch added",
          description: `${currentBranch.name} has been added to your business.`,
        })
      }

      setCurrentBranch({
        id: 0,
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        email: "",
        manager: "",
        isMain: false,
      })
      setBranchModalOpen(false)
    } else {
      setErrors({ ...errors, branch: branchErrors })
    }
  }

  const handleRemoveBranch = (id: number): void => {
    // Don't allow removing the main branch
    const branch = formData.branches.find((b) => b.id === id)
    if (branch?.isMain) {
      toast({
        title: "Cannot remove main branch",
        description: "The main branch cannot be removed.",
        variant: "destructive",
      })
      return
    }

    setFormData({
      ...formData,
      branches: formData.branches.filter((branch) => branch.id !== id),
    })
    toast({
      title: "Branch removed",
      description: "The branch has been removed from your business.",
    })
  }

  const handleBranchInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setCurrentBranch({
      ...currentBranch,
      [name]: value,
    })
  }

  const handleMainBranchInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      branches: formData.branches.map((branch) => (branch.isMain ? { ...branch, [name]: value } : branch)),
    })
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setLoading(true)

    // Show progress toast
    const loadingToast = toast({
      title: "Creating your business...",
      description: "This may take a few moments.",
    })

    // Simulate API calls with multiple stages
    setTimeout(() => {
      toast({
        title: "Processing business information...",
        description: "Setting up your business profile.",
      })

      setTimeout(() => {
        toast({
          title: "Setting up branches...",
          description: `Creating ${formData.branches.length} branch locations.`,
        })

        setTimeout(() => {
          toast({
            title: "Processing payment details...",
            description: "Securely storing your payment information.",
          })

          setTimeout(() => {
            setLoading(false)

            // Dismiss the loading toast
            // toast.dismiss(loadingToast)

            // Generate subdomain from business name (simplified)
            const subdomain = formData.businessName.toLowerCase().replace(/\s+/g, "")

            // Redirect to success page
            // router.push(`/admin/${subdomain}/success`)
            router.push('/dashboard')
          }, 1000)
        }, 1500)
      }, 1500)
    }, 1500)
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create Your Business</h1>
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              step >= 1 ? "bg-gradient-to-r from-taviflow-blue to-taviflow-accent text-white" : "border bg-muted",
            )}
          >
            {step > 1 ? <Check className="h-3 w-3" /> : "1"}
          </div>
          <Separator className="w-8" />
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              step >= 2 ? "bg-gradient-to-r from-taviflow-blue to-taviflow-accent text-white" : "border bg-muted",
            )}
          >
            {step > 2 ? <Check className="h-3 w-3" /> : "2"}
          </div>
          <Separator className="w-8" />
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              step >= 3 ? "bg-gradient-to-r from-taviflow-blue to-taviflow-accent text-white" : "border bg-muted",
            )}
          >
            {step > 3 ? <Check className="h-3 w-3" /> : "3"}
          </div>
          <Separator className="w-8" />
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              step >= 4 ? "bg-gradient-to-r from-taviflow-blue to-taviflow-accent text-white" : "border bg-muted",
            )}
          >
            {step > 4 ? <Check className="h-3 w-3" /> : "4"}
          </div>
          <Separator className="w-8" />
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              step >= 5 ? "bg-gradient-to-r from-taviflow-blue to-taviflow-accent text-white" : "border bg-muted",
            )}
          >
            {step > 5 ? <Check className="h-3 w-3" /> : "5"}
          </div>
        </div>
      </div>

      <Card className="w-full bg-white shadow-sm">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" /> Business Information
              </CardTitle>
              <CardDescription>Enter your business details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Acme Inc."
                  required
                  className={errors.businessName ? "border-red-500" : ""}
                />
                {errors.businessName && <p className="text-xs text-red-500">{errors.businessName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Business Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about your business..."
                  rows={3}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
                >
                  <SelectTrigger id="industry" className={errors.industry ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.industry && <p className="text-xs text-red-500">{errors.industry}</p>}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                    required
                    className={errors.phoneNumber ? "border-red-500" : ""}
                  />
                  {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="hello@example.com"
                    required
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://www.example.com"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={nextStep} className="gap-1" disabled={stepLoading[step]}>
                {stepLoading[step] ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" /> Address Information
              </CardTitle>
              <CardDescription>Enter your business address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St."
                  required
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    required
                  />
                  {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    required
                  />
                  {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Postal Code *</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    required
                  />
                  {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode}</p>}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-primary/50 text-primary hover:bg-primary/10"
              >
                Back
              </Button>
              <Button onClick={nextStep} className="gap-1 bg-primary hover:bg-primary/90" disabled={stepLoading[step]}>
                {stepLoading[step] ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" /> Services & Branding
              </CardTitle>
              <CardDescription>Add services and upload your business logo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="services">Services Offered (comma separated) *</Label>
                <Textarea
                  id="services"
                  name="services"
                  value={formData.services.join(", ")}
                  onChange={handleServiceChange}
                  placeholder="Consulting, Web Design, Marketing"
                  rows={3}
                  required
                  className={errors.services ? "border-red-500" : ""}
                />
                {errors.services && <p className="text-xs text-red-500">{errors.services}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Business Logo</Label>
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                  <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />
                  <div className="flex flex-col items-center">
                    <p className="mb-2 text-sm font-medium">Drag & drop your logo here</p>
                    <p className="text-xs text-muted-foreground">SVG, PNG, JPG (max. 2MB)</p>
                  </div>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    className="mt-4 w-full max-w-xs"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-primary/50 text-primary hover:bg-primary/10"
              >
                Back
              </Button>
              <Button onClick={nextStep} className="gap-1 bg-primary hover:bg-primary/90" disabled={stepLoading[step]}>
                {stepLoading[step] ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </>
        )}

        {step === 4 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" /> Branch Management
              </CardTitle>
              <CardDescription>Set up your main branch and add additional branches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Branches</h3>
                  <Button
                    onClick={() => {
                      setCurrentBranch({
                        id: 0,
                        name: "",
                        address: "",
                        city: "",
                        state: "",
                        zipCode: "",
                        phoneNumber: "",
                        email: "",
                        manager: "",
                        isMain: false,
                      })
                      setEditingBranchId(null)
                      setBranchModalOpen(true)
                    }}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Branch
                  </Button>
                </div>

                {formData.branches.map((branch) => (
                  <div
                    key={branch.id}
                    className="rounded-md border p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-base text-primary">
                        {branch.name || (branch.isMain ? "Main Branch" : "Branch")}
                      </h4>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBranch(branch)}
                          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                        >
                          Edit
                        </Button>
                        {!branch.isMain && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveBranch(branch.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-y-2 text-sm">
                      <div className="flex">
                        <span className="w-24 text-muted-foreground">Address:</span>
                        <span>
                          {branch.address}, {branch.city}, {branch.state} {branch.zipCode}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-24 text-muted-foreground">Phone:</span>
                        <span>{branch.phoneNumber}</span>
                      </div>
                      {branch.email && (
                        <div className="flex">
                          <span className="w-24 text-muted-foreground">Email:</span>
                          <span>{branch.email}</span>
                        </div>
                      )}
                      {branch.manager && (
                        <div className="flex">
                          <span className="w-24 text-muted-foreground">Manager:</span>
                          <span>{branch.manager}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {formData.branches.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                    <Building2 className="mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No branches added yet. Add your first branch.</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-primary/50 text-primary hover:bg-primary/10"
              >
                Back
              </Button>
              <Button onClick={nextStep} className="gap-1 bg-primary hover:bg-primary/90" disabled={stepLoading[step]}>
                {stepLoading[step] ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </>
        )}

        {step === 5 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Payment Details
              </CardTitle>
              <CardDescription>
                Enter your payment information and mobile money details for future transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <h3 className="text-lg font-medium mb-4">Card Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.paymentDetails.cardNumber}
                      onChange={handlePaymentInputChange}
                      placeholder="5399 8282 8282 8210"
                      required
                      className={errors.cardNumber ? "border-red-500" : ""}
                    />
                    {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card *</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={formData.paymentDetails.cardName}
                      onChange={handlePaymentInputChange}
                      placeholder="Mugisha Daniel"
                      required
                      className={errors.cardName ? "border-red-500" : ""}
                    />
                    {errors.cardName && <p className="text-xs text-red-500">{errors.cardName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.paymentDetails.expiryDate}
                      onChange={handlePaymentInputChange}
                      placeholder="MM/YY"
                      required
                      className={errors.expiryDate ? "border-red-500" : ""}
                    />
                    {errors.expiryDate && <p className="text-xs text-red-500">{errors.expiryDate}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      value={formData.paymentDetails.cvv}
                      onChange={handlePaymentInputChange}
                      placeholder="123"
                      required
                      className={errors.cvv ? "border-red-500" : ""}
                    />
                    {errors.cvv && <p className="text-xs text-red-500">{errors.cvv}</p>}
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <h3 className="text-lg font-medium mb-4">Mobile Money Information</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We need you to provide your MTN and/or Airtel numbers for future payments and transactions.
                </p>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="mtnNumber">MTN Mobile Money Number</Label>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-yellow-500" />
                        <Input
                          id="mtnNumber"
                          name="mtnNumber"
                          value={formData.paymentDetails.mtnNumber || ""}
                          onChange={handlePaymentInputChange}
                          placeholder="0772123456"
                          className={errors.mtnNumber ? "border-red-500" : ""}
                        />
                      </div>
                      {errors.mtnNumber && <p className="text-xs text-red-500">{errors.mtnNumber}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="airtelNumber">Airtel Money Number</Label>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-red-500" />
                        <Input
                          id="airtelNumber"
                          name="airtelNumber"
                          value={formData.paymentDetails.airtelNumber || ""}
                          onChange={handlePaymentInputChange}
                          placeholder="0751123456"
                          className={errors.airtelNumber ? "border-red-500" : ""}
                        />
                      </div>
                      {errors.airtelNumber && <p className="text-xs text-red-500">{errors.airtelNumber}</p>}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    <p>At least one mobile money number is required for business transactions.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-primary/50 text-primary hover:bg-primary/10"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Business...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
            </CardFooter>
          </>
        )}
      </Card>

      <Dialog open={branchModalOpen} onOpenChange={setBranchModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-primary">{editingBranchId ? "Edit Branch" : "Add New Branch"}</DialogTitle>
            <DialogDescription>Enter the details for your branch location.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="branchName">Branch Name *</Label>
              <Input
                id="branchName"
                name="name"
                value={currentBranch.name}
                onChange={handleBranchInputChange}
                placeholder="Balinda Mubarak"
                className={errors.branch?.name ? "border-red-500" : ""}
              />
              {errors.branch?.name && <p className="text-xs text-red-500">{errors.branch.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="branchAddress">Street Address *</Label>
              <Input
                id="branchAddress"
                name="address"
                value={currentBranch.address}
                onChange={handleBranchInputChange}
                placeholder="Mugurusi, Fort Portal"
                className={errors.branch?.address ? "border-red-500" : ""}
              />
              {errors.branch?.address && <p className="text-xs text-red-500">{errors.branch.address}</p>}
            </div>
            <div className="grid gap-4 grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="branchCity">City/Town *</Label>
                <Input
                  id="branchCity"
                  name="city"
                  value={currentBranch.city}
                  onChange={handleBranchInputChange}
                  placeholder="Kampala"
                  className={errors.branch?.city ? "border-red-500" : ""}
                />
                {errors.branch?.city && <p className="text-xs text-red-500">{errors.branch.city}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchState">District *</Label>
                <Input
                  id="branchState"
                  name="state"
                  value={currentBranch.state}
                  onChange={handleBranchInputChange}
                  placeholder="Mbarara"
                  className={errors.branch?.state ? "border-red-500" : ""}
                />
                {errors.branch?.state && <p className="text-xs text-red-500">{errors.branch.state}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchZipCode">Postal Code *</Label>
                <Input
                  id="branchZipCode"
                  name="zipCode"
                  value={currentBranch.zipCode}
                  onChange={handleBranchInputChange}
                  placeholder="541312"
                  className={errors.branch?.zipCode ? "border-red-500" : ""}
                />
                {errors.branch?.zipCode && <p className="text-xs text-red-500">{errors.branch.zipCode}</p>}
              </div>
            </div>
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="branchPhone">Phone Number *</Label>
                <Input
                  id="branchPhone"
                  name="phoneNumber"
                  value={currentBranch.phoneNumber}
                  onChange={handleBranchInputChange}
                  placeholder="0771050357"
                  className={errors.branch?.phoneNumber ? "border-red-500" : ""}
                />
                {errors.branch?.phoneNumber && <p className="text-xs text-red-500">{errors.branch.phoneNumber}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchEmail">Email Address</Label>
                <Input
                  id="branchEmail"
                  name="email"
                  value={currentBranch.email}
                  onChange={handleBranchInputChange}
                  placeholder="bmubs15@gmail.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="branchManager">Branch Manager</Label>
              <Input
                id="branchManager"
                name="manager"
                value={currentBranch.manager}
                onChange={handleBranchInputChange}
                placeholder="Nakayima Sarah"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setBranchModalOpen(false)
                setEditingBranchId(null)
                setCurrentBranch({
                  id: 0,
                  name: "",
                  address: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  phoneNumber: "",
                  email: "",
                  manager: "",
                  isMain: false,
                })
              }}
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              Cancel
            </Button>
            <Button onClick={handleAddBranch} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {editingBranchId ? "Update Branch" : "Add Branch"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

