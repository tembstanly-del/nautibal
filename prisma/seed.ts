import { PrismaClient, ClientType, QuoteStatus, InvoiceStatus, PaymentMethod, MovementType } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
})

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean existing data
  console.log('🧹 Cleaning existing data...')
  await prisma.stockMovement.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.invoiceItem.deleteMany()
  await prisma.invoice.deleteMany()
  await prisma.quoteItem.deleteMany()
  await prisma.quote.deleteMany()
  await prisma.product.deleteMany()
  await prisma.client.deleteMany()
  await prisma.settings.deleteMany()

  // Create Settings
  console.log('⚙️ Creating settings...')
  await prisma.settings.create({
    data: {
      id: 'default',
      companyName: 'Medizam Healthcare Limited',
      companyAddress: '15 Independence Avenue, Accra, Ghana',
      companyPhone: '+233 30 123 4567',
      companyEmail: 'info@medizam.com',
      defaultTaxRate: new Decimal(0),
      quotePrefix: 'QT',
      quoteNextNumber: 1001,
      invoicePrefix: 'INV',
      invoiceNextNumber: 1001,
      defaultPaymentTerms: 30,
      defaultQuoteValidity: 14,
      defaultQuoteTerms: 'Prices are valid for 14 days from the date of this quotation.',
      defaultInvoiceTerms: 'Payment is due within 30 days of invoice date.',
      currency: 'GHS',
      currencySymbol: 'GH₵',
    },
  })

  // Create Products
  console.log('📦 Creating products...')
  const products = await Promise.all([
    // Medical Consumables
    prisma.product.create({
      data: {
        name: 'Surgical Gloves (Latex, Powder-Free)',
        aliases: ['Latex Gloves', 'Surgical Gloves Latex', 'Gloves Latex PF', 'Examination Gloves'],
        description: 'High-quality latex surgical gloves, powder-free. Box of 100.',
        sku: 'MED-GLV-001',
        price: new Decimal(85.00),
        unit: 'box',
        category: 'Medical Consumables',
        stockQuantity: 250,
        minStockLevel: 50,
        reorderQuantity: 100,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Nitrile Examination Gloves',
        aliases: ['Nitrile Gloves', 'Blue Gloves', 'Exam Gloves Nitrile'],
        description: 'Nitrile examination gloves, blue, box of 100.',
        sku: 'MED-GLV-002',
        price: new Decimal(95.00),
        unit: 'box',
        category: 'Medical Consumables',
        stockQuantity: 180,
        minStockLevel: 40,
        reorderQuantity: 100,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Disposable Face Masks (3-Ply)',
        aliases: ['Face Masks', 'Surgical Masks', '3 Ply Masks', 'Medical Masks'],
        description: 'Disposable 3-ply surgical face masks. Box of 50.',
        sku: 'MED-MSK-001',
        price: new Decimal(45.00),
        unit: 'box',
        category: 'Medical Consumables',
        stockQuantity: 500,
        minStockLevel: 100,
        reorderQuantity: 200,
      },
    }),
    prisma.product.create({
      data: {
        name: 'N95 Respirator Masks',
        aliases: ['N95 Masks', 'Respirators', 'FFP2 Masks'],
        description: 'NIOSH-approved N95 respirator masks. Box of 20.',
        sku: 'MED-MSK-002',
        price: new Decimal(120.00),
        unit: 'box',
        category: 'Medical Consumables',
        stockQuantity: 150,
        minStockLevel: 30,
        reorderQuantity: 60,
      },
    }),
    // Wound Care
    prisma.product.create({
      data: {
        name: 'Sterile Gauze Pads (4x4 inch)',
        aliases: ['Gauze', 'Gauze Pads', 'Sterile Dressing'],
        description: 'Sterile gauze pads, 4x4 inch, pack of 100.',
        sku: 'WND-GAU-001',
        price: new Decimal(35.00),
        unit: 'pack',
        category: 'Wound Care',
        stockQuantity: 300,
        minStockLevel: 60,
        reorderQuantity: 120,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Adhesive Bandages (Assorted)',
        aliases: ['Band-Aids', 'Plasters', 'Adhesive Strips'],
        description: 'Adhesive bandages, assorted sizes, box of 100.',
        sku: 'WND-BND-001',
        price: new Decimal(25.00),
        unit: 'box',
        category: 'Wound Care',
        stockQuantity: 400,
        minStockLevel: 80,
        reorderQuantity: 150,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Medical Tape (1 inch x 10 yards)',
        aliases: ['Surgical Tape', 'First Aid Tape', 'Adhesive Tape'],
        description: 'Hypoallergenic medical tape, 1 inch wide, 10 yards.',
        sku: 'WND-TPE-001',
        price: new Decimal(8.50),
        unit: 'roll',
        category: 'Wound Care',
        stockQuantity: 600,
        minStockLevel: 100,
        reorderQuantity: 200,
      },
    }),
    // Syringes & Needles
    prisma.product.create({
      data: {
        name: 'Disposable Syringes (5ml)',
        aliases: ['5ml Syringes', 'Syringes 5cc'],
        description: 'Disposable syringes, 5ml, box of 100.',
        sku: 'INJ-SYR-005',
        price: new Decimal(55.00),
        unit: 'box',
        category: 'Syringes & Needles',
        stockQuantity: 200,
        minStockLevel: 40,
        reorderQuantity: 80,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Disposable Syringes (10ml)',
        aliases: ['10ml Syringes', 'Syringes 10cc'],
        description: 'Disposable syringes, 10ml, box of 100.',
        sku: 'INJ-SYR-010',
        price: new Decimal(65.00),
        unit: 'box',
        category: 'Syringes & Needles',
        stockQuantity: 180,
        minStockLevel: 35,
        reorderQuantity: 70,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Hypodermic Needles (21G)',
        aliases: ['Needles 21G', 'Injection Needles', 'Hypodermic 21 Gauge'],
        description: 'Hypodermic needles, 21 gauge, box of 100.',
        sku: 'INJ-NDL-021',
        price: new Decimal(28.00),
        unit: 'box',
        category: 'Syringes & Needles',
        stockQuantity: 250,
        minStockLevel: 50,
        reorderQuantity: 100,
      },
    }),
    // IV Supplies
    prisma.product.create({
      data: {
        name: 'IV Cannula (18G)',
        aliases: ['IV Catheter 18G', 'Venflon', 'IV Access'],
        description: 'IV cannula, 18 gauge, box of 50.',
        sku: 'IV-CAN-018',
        price: new Decimal(75.00),
        unit: 'box',
        category: 'IV Supplies',
        stockQuantity: 120,
        minStockLevel: 25,
        reorderQuantity: 50,
      },
    }),
    prisma.product.create({
      data: {
        name: 'IV Giving Set (Standard)',
        aliases: ['IV Set', 'Infusion Set', 'Drip Set'],
        description: 'Standard IV giving set with flow regulator.',
        sku: 'IV-GVS-001',
        price: new Decimal(12.00),
        unit: 'piece',
        category: 'IV Supplies',
        stockQuantity: 350,
        minStockLevel: 70,
        reorderQuantity: 140,
      },
    }),
    // Diagnostic
    prisma.product.create({
      data: {
        name: 'Blood Pressure Monitor (Digital)',
        aliases: ['BP Monitor', 'Sphygmomanometer', 'Blood Pressure Machine'],
        description: 'Automatic digital blood pressure monitor with memory function.',
        sku: 'DIA-BPM-001',
        price: new Decimal(280.00),
        unit: 'unit',
        category: 'Diagnostic Equipment',
        stockQuantity: 25,
        minStockLevel: 5,
        reorderQuantity: 10,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Pulse Oximeter',
        aliases: ['SpO2 Monitor', 'Oxygen Saturation Monitor', 'Finger Pulse Oximeter'],
        description: 'Fingertip pulse oximeter with OLED display.',
        sku: 'DIA-POX-001',
        price: new Decimal(95.00),
        unit: 'unit',
        category: 'Diagnostic Equipment',
        stockQuantity: 45,
        minStockLevel: 10,
        reorderQuantity: 20,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Digital Thermometer',
        aliases: ['Thermometer', 'Clinical Thermometer', 'Fever Thermometer'],
        description: 'Digital clinical thermometer with fever alert.',
        sku: 'DIA-THM-001',
        price: new Decimal(18.00),
        unit: 'unit',
        category: 'Diagnostic Equipment',
        stockQuantity: 100,
        minStockLevel: 20,
        reorderQuantity: 40,
      },
    }),
    // Disinfectants
    prisma.product.create({
      data: {
        name: 'Hand Sanitizer (500ml)',
        aliases: ['Sanitizer', 'Hand Gel', 'Alcohol Gel'],
        description: 'Alcohol-based hand sanitizer, 70% ethanol, 500ml pump bottle.',
        sku: 'DIS-SAN-500',
        price: new Decimal(22.00),
        unit: 'bottle',
        category: 'Disinfectants',
        stockQuantity: 300,
        minStockLevel: 60,
        reorderQuantity: 120,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Surface Disinfectant Wipes',
        aliases: ['Disinfectant Wipes', 'Sanitizing Wipes', 'Cleaning Wipes'],
        description: 'Hospital-grade surface disinfectant wipes, canister of 100.',
        sku: 'DIS-WIP-001',
        price: new Decimal(35.00),
        unit: 'canister',
        category: 'Disinfectants',
        stockQuantity: 200,
        minStockLevel: 40,
        reorderQuantity: 80,
      },
    }),
    // Low stock items for testing alerts
    prisma.product.create({
      data: {
        name: 'Surgical Sutures (Absorbable)',
        aliases: ['Sutures', 'Stitches', 'Catgut'],
        description: 'Absorbable surgical sutures, assorted sizes, box of 12.',
        sku: 'SUR-SUT-001',
        price: new Decimal(145.00),
        unit: 'box',
        category: 'Surgical Supplies',
        stockQuantity: 8, // Below minimum!
        minStockLevel: 15,
        reorderQuantity: 30,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Surgical Blades (#15)',
        aliases: ['Scalpel Blades', 'Surgical Knife Blades'],
        description: 'Sterile surgical blades, size 15, box of 100.',
        sku: 'SUR-BLD-015',
        price: new Decimal(48.00),
        unit: 'box',
        category: 'Surgical Supplies',
        stockQuantity: 5, // Below minimum!
        minStockLevel: 10,
        reorderQuantity: 25,
      },
    }),
  ])

  console.log(`   Created ${products.length} products`)

  // Create Clients
  console.log('👥 Creating clients...')
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        name: 'Korle-Bu Teaching Hospital',
        email: 'procurement@kbth.gov.gh',
        phone: '+233 30 266 5401',
        address: 'Guggisberg Avenue',
        city: 'Accra',
        contactName: 'Dr. Kofi Mensah',
        contactEmail: 'k.mensah@kbth.gov.gh',
        contactPhone: '+233 24 123 4567',
        clientType: ClientType.HOSPITAL,
        paymentTerms: 45,
        notes: 'Government hospital - requires proforma invoice',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Ridge Hospital',
        email: 'supplies@ridgehospital.gov.gh',
        phone: '+233 30 222 6969',
        address: 'Castle Road',
        city: 'Accra',
        contactName: 'Mrs. Abena Owusu',
        contactEmail: 'a.owusu@ridgehospital.gov.gh',
        contactPhone: '+233 24 234 5678',
        clientType: ClientType.GOVERNMENT,
        paymentTerms: 60,
      },
    }),
    prisma.client.create({
      data: {
        name: 'Ernest Chemist Ltd',
        email: 'orders@ernestchemist.com.gh',
        phone: '+233 30 222 1234',
        address: '25 Cantonments Road',
        city: 'Accra',
        contactName: 'Mr. Ernest Adjei',
        contactEmail: 'ernest@ernestchemist.com.gh',
        contactPhone: '+233 24 345 6789',
        clientType: ClientType.PHARMACY,
        paymentTerms: 30,
        notes: 'VIP client - priority delivery',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Ghana Health Service',
        email: 'procurement@ghs.gov.gh',
        phone: '+233 30 268 4100',
        address: 'Private Mail Bag',
        city: 'Accra',
        contactName: 'Dr. Patrick Kuma-Aboagye',
        contactEmail: 'p.aboagye@ghs.gov.gh',
        contactPhone: '+233 24 456 7890',
        clientType: ClientType.GOVERNMENT,
        paymentTerms: 90,
        notes: 'Bulk orders - requires tender documentation',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Nyaho Medical Centre',
        email: 'purchase@nyahomedical.com',
        phone: '+233 30 277 4402',
        address: '7 Volta Street, Airport Residential',
        city: 'Accra',
        contactName: 'Ms. Nana Ama Darkwa',
        contactEmail: 'n.darkwa@nyahomedical.com',
        contactPhone: '+233 24 567 8901',
        clientType: ClientType.HOSPITAL,
        paymentTerms: 30,
      },
    }),
    prisma.client.create({
      data: {
        name: 'MedPharm Distributors',
        email: 'info@medpharm.com.gh',
        phone: '+233 30 277 5533',
        address: 'Industrial Area, Tema',
        city: 'Tema',
        contactName: 'Mr. Kwame Asante',
        contactEmail: 'k.asante@medpharm.com.gh',
        contactPhone: '+233 24 678 9012',
        clientType: ClientType.DISTRIBUTOR,
        paymentTerms: 14,
        creditLimit: new Decimal(50000),
        notes: 'Distributor - bulk pricing applies',
      },
    }),
  ])

  console.log(`   Created ${clients.length} clients`)

  // Create Sample Quotes
  console.log('📝 Creating sample quotes...')
  const quotes = await Promise.all([
    // Quote 1 - Draft
    prisma.quote.create({
      data: {
        quoteNumber: 'QT-2025-0001',
        clientId: clients[0].id, // Korle-Bu
        status: QuoteStatus.DRAFT,
        issueDate: new Date('2025-01-02'),
        validUntil: new Date('2025-01-16'),
        subtotal: new Decimal(1850.00),
        taxRate: new Decimal(0),
        taxAmount: new Decimal(0),
        discount: new Decimal(0),
        total: new Decimal(1850.00),
        notes: 'Bulk order for Q1 2025',
        items: {
          create: [
            {
              productId: products[0].id, // Surgical Gloves
              productName: 'Surgical Gloves (Latex, Powder-Free)',
              quantity: 10,
              unit: 'box',
              unitPrice: new Decimal(85.00),
              total: new Decimal(850.00),
              sortOrder: 1,
            },
            {
              productId: products[2].id, // Face Masks
              productName: 'Disposable Face Masks (3-Ply)',
              quantity: 10,
              unit: 'box',
              unitPrice: new Decimal(45.00),
              total: new Decimal(450.00),
              sortOrder: 2,
            },
            {
              productId: products[7].id, // Syringes 5ml
              productName: 'Disposable Syringes (5ml)',
              quantity: 10,
              unit: 'box',
              unitPrice: new Decimal(55.00),
              total: new Decimal(550.00),
              sortOrder: 3,
            },
          ],
        },
      },
    }),
    // Quote 2 - Sent/Approved
    prisma.quote.create({
      data: {
        quoteNumber: 'QT-2025-0002',
        clientId: clients[2].id, // Ernest Chemist
        status: QuoteStatus.APPROVED,
        issueDate: new Date('2025-01-03'),
        validUntil: new Date('2025-01-17'),
        subtotal: new Decimal(2970.00),
        taxRate: new Decimal(0),
        taxAmount: new Decimal(0),
        discount: new Decimal(0),
        total: new Decimal(2970.00),
        items: {
          create: [
            {
              productId: products[12].id, // BP Monitor
              productName: 'Blood Pressure Monitor (Digital)',
              quantity: 5,
              unit: 'unit',
              unitPrice: new Decimal(280.00),
              total: new Decimal(1400.00),
              sortOrder: 1,
            },
            {
              productId: products[13].id, // Pulse Oximeter
              productName: 'Pulse Oximeter',
              quantity: 10,
              unit: 'unit',
              unitPrice: new Decimal(95.00),
              total: new Decimal(950.00),
              sortOrder: 2,
            },
            {
              productId: products[14].id, // Thermometer
              productName: 'Digital Thermometer',
              quantity: 20,
              unit: 'unit',
              unitPrice: new Decimal(18.00),
              total: new Decimal(360.00),
              quantityConverted: 10, // Partially converted
              sortOrder: 3,
            },
            {
              productId: products[15].id, // Sanitizer
              productName: 'Hand Sanitizer (500ml)',
              quantity: 20,
              unit: 'bottle',
              unitPrice: new Decimal(22.00),
              total: new Decimal(440.00),
              quantityConverted: 20, // Fully converted
              sortOrder: 4,
            },
          ],
        },
      },
    }),
    // Quote 3 - Partial conversion
    prisma.quote.create({
      data: {
        quoteNumber: 'QT-2025-0003',
        clientId: clients[4].id, // Nyaho Medical
        status: QuoteStatus.PARTIAL,
        issueDate: new Date('2025-01-04'),
        validUntil: new Date('2025-01-18'),
        subtotal: new Decimal(1185.00),
        taxRate: new Decimal(0),
        taxAmount: new Decimal(0),
        discount: new Decimal(0),
        total: new Decimal(1185.00),
        items: {
          create: [
            {
              productId: products[1].id, // Nitrile Gloves
              productName: 'Nitrile Examination Gloves',
              quantity: 5,
              unit: 'box',
              unitPrice: new Decimal(95.00),
              total: new Decimal(475.00),
              quantityConverted: 3,
              sortOrder: 1,
            },
            {
              productId: products[3].id, // N95 Masks
              productName: 'N95 Respirator Masks',
              quantity: 5,
              unit: 'box',
              unitPrice: new Decimal(120.00),
              total: new Decimal(600.00),
              quantityConverted: 5,
              sortOrder: 2,
            },
            {
              productId: products[11].id, // IV Giving Set
              productName: 'IV Giving Set (Standard)',
              quantity: 10,
              unit: 'piece',
              unitPrice: new Decimal(12.00),
              total: new Decimal(120.00),
              quantityConverted: 0,
              sortOrder: 3,
            },
          ],
        },
      },
    }),
  ])

  console.log(`   Created ${quotes.length} quotes`)

  // Create Sample Invoices
  console.log('🧾 Creating sample invoices...')
  const invoices = await Promise.all([
    // Invoice from Quote 2 (partial)
    prisma.invoice.create({
      data: {
        invoiceNumber: 'INV-2025-0001',
        clientId: clients[2].id, // Ernest Chemist
        quoteId: quotes[1].id, // From QT-2025-0002
        status: InvoiceStatus.PAID,
        issueDate: new Date('2025-01-05'),
        dueDate: new Date('2025-02-04'),
        subtotal: new Decimal(800.00),
        taxRate: new Decimal(0),
        taxAmount: new Decimal(0),
        discount: new Decimal(0),
        total: new Decimal(800.00),
        amountPaid: new Decimal(800.00),
        balanceDue: new Decimal(0),
        items: {
          create: [
            {
              productId: products[14].id, // Thermometer
              productName: 'Digital Thermometer',
              quantity: 10,
              unit: 'unit',
              unitPrice: new Decimal(18.00),
              total: new Decimal(180.00),
              sortOrder: 1,
            },
            {
              productId: products[15].id, // Sanitizer
              productName: 'Hand Sanitizer (500ml)',
              quantity: 20,
              unit: 'bottle',
              unitPrice: new Decimal(22.00),
              total: new Decimal(440.00),
              sortOrder: 2,
            },
            {
              productId: products[12].id, // BP Monitor
              productName: 'Blood Pressure Monitor (Digital)',
              quantity: 1,
              unit: 'unit',
              unitPrice: new Decimal(280.00),
              total: new Decimal(280.00),
              sortOrder: 3,
            },
          ],
        },
      },
    }),
    // Invoice from Quote 3 (partial)
    prisma.invoice.create({
      data: {
        invoiceNumber: 'INV-2025-0002',
        clientId: clients[4].id, // Nyaho Medical
        quoteId: quotes[2].id, // From QT-2025-0003
        status: InvoiceStatus.PARTIAL,
        issueDate: new Date('2025-01-06'),
        dueDate: new Date('2025-02-05'),
        subtotal: new Decimal(885.00),
        taxRate: new Decimal(0),
        taxAmount: new Decimal(0),
        discount: new Decimal(0),
        total: new Decimal(885.00),
        amountPaid: new Decimal(500.00),
        balanceDue: new Decimal(385.00),
        items: {
          create: [
            {
              productId: products[1].id, // Nitrile Gloves
              productName: 'Nitrile Examination Gloves',
              quantity: 3,
              unit: 'box',
              unitPrice: new Decimal(95.00),
              total: new Decimal(285.00),
              sortOrder: 1,
            },
            {
              productId: products[3].id, // N95 Masks
              productName: 'N95 Respirator Masks',
              quantity: 5,
              unit: 'box',
              unitPrice: new Decimal(120.00),
              total: new Decimal(600.00),
              sortOrder: 2,
            },
          ],
        },
      },
    }),
    // Standalone invoice (not from quote)
    prisma.invoice.create({
      data: {
        invoiceNumber: 'INV-2025-0003',
        clientId: clients[5].id, // MedPharm Distributors
        status: InvoiceStatus.SENT,
        issueDate: new Date('2025-01-07'),
        dueDate: new Date('2025-01-21'),
        subtotal: new Decimal(4350.00),
        taxRate: new Decimal(0),
        taxAmount: new Decimal(0),
        discount: new Decimal(0),
        total: new Decimal(4350.00),
        amountPaid: new Decimal(0),
        balanceDue: new Decimal(4350.00),
        notes: 'Bulk order - distributor pricing applied',
        items: {
          create: [
            {
              productId: products[0].id, // Surgical Gloves
              productName: 'Surgical Gloves (Latex, Powder-Free)',
              quantity: 20,
              unit: 'box',
              unitPrice: new Decimal(80.00), // Discounted
              total: new Decimal(1600.00),
              sortOrder: 1,
            },
            {
              productId: products[1].id, // Nitrile Gloves
              productName: 'Nitrile Examination Gloves',
              quantity: 15,
              unit: 'box',
              unitPrice: new Decimal(90.00), // Discounted
              total: new Decimal(1350.00),
              sortOrder: 2,
            },
            {
              productId: products[2].id, // Face Masks
              productName: 'Disposable Face Masks (3-Ply)',
              quantity: 20,
              unit: 'box',
              unitPrice: new Decimal(42.00), // Discounted
              total: new Decimal(840.00),
              sortOrder: 3,
            },
            {
              productId: products[15].id, // Sanitizer
              productName: 'Hand Sanitizer (500ml)',
              quantity: 30,
              unit: 'bottle',
              unitPrice: new Decimal(20.00), // Discounted
              total: new Decimal(600.00),
              sortOrder: 4,
            },
          ],
        },
      },
    }),
  ])

  console.log(`   Created ${invoices.length} invoices`)

  // Create Payments
  console.log('💰 Creating payments...')
  const payments = await Promise.all([
    prisma.payment.create({
      data: {
        invoiceId: invoices[0].id, // INV-2025-0001
        amount: new Decimal(800.00),
        paymentDate: new Date('2025-01-07'),
        paymentMethod: PaymentMethod.BANK_TRANSFER,
        reference: 'TRF-123456789',
        notes: 'Full payment received',
      },
    }),
    prisma.payment.create({
      data: {
        invoiceId: invoices[1].id, // INV-2025-0002
        amount: new Decimal(500.00),
        paymentDate: new Date('2025-01-06'),
        paymentMethod: PaymentMethod.MOBILE_MONEY,
        reference: 'MTN-987654321',
        notes: 'Partial payment - balance due',
      },
    }),
  ])

  console.log(`   Created ${payments.length} payments`)

  // Create Stock Movements
  console.log('📊 Creating stock movements...')
  const stockMovements = await Promise.all([
    // Initial stock entries (sample)
    prisma.stockMovement.create({
      data: {
        productId: products[0].id, // Surgical Gloves
        type: MovementType.INITIAL,
        quantity: 250,
        previousStock: 0,
        newStock: 250,
        notes: 'Initial inventory count',
      },
    }),
    prisma.stockMovement.create({
      data: {
        productId: products[0].id, // Surgical Gloves
        type: MovementType.INVOICE,
        quantity: -20,
        previousStock: 270,
        newStock: 250,
        invoiceId: invoices[2].id,
        notes: 'Stock out for INV-2025-0003',
      },
    }),
    prisma.stockMovement.create({
      data: {
        productId: products[1].id, // Nitrile Gloves
        type: MovementType.INVOICE,
        quantity: -18,
        previousStock: 198,
        newStock: 180,
        invoiceId: invoices[1].id,
        notes: 'Stock out for INV-2025-0002',
      },
    }),
    prisma.stockMovement.create({
      data: {
        productId: products[3].id, // N95 Masks
        type: MovementType.INVOICE,
        quantity: -5,
        previousStock: 155,
        newStock: 150,
        invoiceId: invoices[1].id,
        notes: 'Stock out for INV-2025-0002',
      },
    }),
    prisma.stockMovement.create({
      data: {
        productId: products[17].id, // Surgical Sutures
        type: MovementType.ADJUSTMENT,
        quantity: -2,
        previousStock: 10,
        newStock: 8,
        notes: 'Stock adjustment - damaged items',
      },
    }),
  ])

  console.log(`   Created ${stockMovements.length} stock movements`)

  console.log('')
  console.log('✅ Database seeded successfully!')
  console.log('')
  console.log('📊 Summary:')
  console.log(`   - ${products.length} products`)
  console.log(`   - ${clients.length} clients`)
  console.log(`   - ${quotes.length} quotes`)
  console.log(`   - ${invoices.length} invoices`)
  console.log(`   - ${payments.length} payments`)
  console.log(`   - ${stockMovements.length} stock movements`)
  console.log('')
  console.log('⚠️  Low stock items:')
  console.log('   - Surgical Sutures (Absorbable): 8 units (min: 15)')
  console.log('   - Surgical Blades (#15): 5 units (min: 10)')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
