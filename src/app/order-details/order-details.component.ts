import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MatTableDataSource } from '@angular/material/table'; // Import MatTableDataSource

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact No.', 'Status', 'Action'];
  dataSource = new MatTableDataSource<any>(); // Initialize dataSource as MatTableDataSource

  status: string = 'All';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(statusParameter: string) {
    this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe(
      (resp) => {
        this.dataSource.data = resp; // Assign data to the dataSource
        console.log(resp);
      }, (error) => {
        console.log(error);
      }
    );
  }

  markAsDelivered(orderId: string) {
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (response) => {
        this.getAllOrderDetailsForAdmin(this.status);
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    );
  }

}
