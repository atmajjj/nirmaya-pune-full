# Data Sources API - Quick Reference

## 📁 Files Created/Modified

### New Files
- `src/types/data-source.types.ts` - TypeScript definitions
- `src/services/api/dataSourceService.ts` - API service
- `src/pages/scientist/DataSources.tsx` - Data management page
- `DATA_SOURCES_INTEGRATION.md` - Full integration documentation

### Modified Files
- `src/pages/field-technician/UploadDataset.tsx` - Real API integration
- `src/pages/field-technician/Overview.tsx` - Real statistics
- `src/config/navigation.tsx` - Added Data Sources to scientist nav
- `src/App.tsx` - Added Data Sources route
- `src/services/api/index.ts` - Export dataSourceService
- `src/types/index.ts` - Export data source types
- `src/pages/Login.tsx` - Field technician redirect (already done)

## 🚀 Quick Start

### For Field Technicians
```typescript
// Upload a file
const dataSource = await dataSourceService.upload(file, "Mumbai water quality data");

// Get your stats
const stats = await dataSourceService.getStats();
// Returns: { total_uploads, pending_review, available, failed, processing }
```

### For Scientists
```typescript
// List all data sources
const response = await dataSourceService.list({
  status: 'available',
  page: 1,
  limit: 10
});

// Calculate HMPI from a data source
const result = await dataSourceService.calculateFromSource(sourceId);

// Reprocess a failed upload
await dataSourceService.reprocess(sourceId);

// Delete a data source
await dataSourceService.delete(sourceId);
```

## 📊 Data Flow

```
Field Technician                Backend                 Scientist
      |                            |                         |
      |-- Upload CSV ------------->|                         |
      |<-- Status: pending --------|                         |
      |                            |-- Processing -->        |
      |<-- Status: available ------|                         |
      |                            |                         |
      |                            |<-- Calculate HMPI -----|
      |                            |-- Run calculations --> |
      |                            |-- Results ------------>|
```

## 🔑 Key API Endpoints

| Endpoint | Method | Role | Purpose |
|----------|--------|------|---------|
| `/data-sources/upload` | POST | FT, Admin | Upload file |
| `/data-sources` | GET | All | List sources |
| `/data-sources/:id` | GET | All | Get details |
| `/data-sources/:id` | DELETE | FT(own), Sci, Admin | Delete |
| `/data-sources/:id/reprocess` | POST | Sci, Admin | Retry |
| `/hmpi-engine/calculate-from-source` | POST | Sci, PM, Admin | Calculate |

*FT = Field Technician, Sci = Scientist, PM = Policymaker*

## 📦 Data Structures

### DataSource
```typescript
{
  id: number;
  filename: string;
  original_filename: string;
  file_type: 'csv' | 'xlsx' | 'xls';
  file_size: number;
  status: 'pending' | 'processing' | 'available' | 'failed' | 'archived';
  metadata: {
    total_rows: number;
    stations: string[];
    date_range: { from: string; to: string; };
  } | null;
  uploader: { id, full_name, email };
  created_at: string;
}
```

### Status Flow
```
pending → processing → available ✅
                    └→ failed ❌ → reprocess → processing
```

## 🎯 Common Use Cases

### Upload and Wait for Processing
```typescript
const source = await dataSourceService.upload(file, description);

// Poll until ready
const finalSource = await dataSourceService.pollStatus(source.id);

if (finalSource.status === 'available') {
  // Ready for calculation
}
```

### Filter Available Sources
```typescript
const { data } = await dataSourceService.list({
  status: 'available',
  sort_by: 'created_at',
  sort_order: 'desc'
});
```

### Calculate with Error Handling
```typescript
try {
  const result = await dataSourceService.calculateFromSource(id);
  console.log(`Success: ${result.successful_calculations} records`);
} catch (error) {
  console.error('Calculation failed:', error.message);
}
```

## 🛠️ Testing

### Test Upload
1. Login as field_technician (fieldtech@nirmaya.test / fieldtech123)
2. Navigate to Upload Dataset
3. Upload sample CSV with Station and Date columns
4. Check Overview for updated stats

### Test Management
1. Login as scientist
2. Navigate to Data Sources
3. View uploaded files
4. Try Calculate, Reprocess, Delete actions

## ⚠️ Important Notes

- **File Size:** Max 50MB
- **Required Columns:** Station, Date
- **Processing:** Async - use polling or check later
- **Permissions:** Field technicians can only see/delete their own uploads
- **Status:** Only 'available' sources can be used for calculations

## 📱 UI Components

### Field Technician
- Overview stats cards
- Upload form with drag-drop
- Toast notifications

### Scientist
- Paginated table
- Status badges
- Action buttons (Calculate, Retry, Delete)
- Search and filters

## 🔍 Debugging

Check these if something isn't working:

1. **Network Tab:** Verify API calls are being made
2. **Console:** Check for error messages
3. **JWT Token:** Ensure user is authenticated
4. **Status:** Verify data source status before operations
5. **Permissions:** Check user role has access to endpoint

## 📚 Full Documentation

See `DATA_SOURCES_INTEGRATION.md` for complete details.
